import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, LogOut } from 'lucide-react';

export default function Admin() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'blog' | 'events' | 'gallery' | 'contacts'>('blog');
  const [showForm, setShowForm] = useState(false);

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'announcement',
  });

  // Events form state
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'workshop',
    registrationLink: '',
  });

  // Gallery form state
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'event',
  });

  // Queries
  const { data: blogPosts = [] } = trpc.blog.list.useQuery();
  const { data: events = [] } = trpc.events.list.useQuery();
  const { data: contacts = [] } = trpc.contact.list.useQuery();
  const { data: galleryImages = [] } = trpc.gallery.list.useQuery();

  // Mutations
  const createBlogMutation = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success('Blog post created successfully!');
      setBlogForm({ title: '', slug: '', content: '', excerpt: '', category: 'announcement' });
      setShowForm(false);
    },
    onError: (error) => {
      toast.error('Failed to create blog post');
    },
  });

  const createEventMutation = trpc.events.create.useMutation({
    onSuccess: () => {
      toast.success('Event created successfully!');
      setEventForm({ title: '', description: '', date: '', location: '', category: 'workshop', registrationLink: '' });
      setShowForm(false);
    },
    onError: (error) => {
      toast.error('Failed to create event');
    },
  });

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#16213e] via-[#0f3460] to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8">You need admin privileges to access this page.</p>
          <Button onClick={logout} className="bg-cyan-500 hover:bg-cyan-600">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBlogMutation.mutate(blogForm);
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEventMutation.mutate({
      ...eventForm,
      date: new Date(eventForm.date),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#16213e] via-[#0f3460] to-[#1a1a2e]">
      {/* Header */}
      <div className="border-b border-cyan-500/20 bg-white/5 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome, {user?.name || 'Admin'}</p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-cyan-500/20 bg-white/5 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4">
          {(['blog', 'events', 'gallery', 'contacts'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-cyan-400 border-cyan-500'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Blog Posts</h2>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            {showForm && (
              <Card className="bg-white/5 border border-cyan-500/20 p-6 mb-6">
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Title</label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none"
                      placeholder="Post title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Slug</label>
                    <input
                      type="text"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none"
                      placeholder="post-slug"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Excerpt</label>
                    <textarea
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none"
                      placeholder="Brief description"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Content</label>
                    <textarea
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none"
                      placeholder="Post content"
                      rows={6}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Category</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="announcement">Announcement</option>
                      <option value="tutorial">Tutorial</option>
                      <option value="news">News</option>
                      <option value="career">Career</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={createBlogMutation.isPending}
                      className="bg-cyan-500 hover:bg-cyan-600"
                    >
                      {createBlogMutation.isPending ? 'Creating...' : 'Create Post'}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowForm(false)}
                      variant="outline"
                      className="border-cyan-500/50 text-cyan-400"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <div className="grid gap-4">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-white/5 border border-cyan-500/20 p-4">
                  <h3 className="font-bold text-white mb-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{post.category}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Events</h2>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </div>

            {showForm && (
              <Card className="bg-white/5 border border-cyan-500/20 p-6 mb-6">
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Title</label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none"
                      placeholder="Event title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Description</label>
                    <textarea
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none"
                      placeholder="Event description"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Date</label>
                    <input
                      type="datetime-local"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Location</label>
                    <input
                      type="text"
                      value={eventForm.location}
                      onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none"
                      placeholder="Event location"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Category</label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="workshop">Workshop</option>
                      <option value="competition">Competition</option>
                      <option value="networking">Networking</option>
                      <option value="bootcamp">Bootcamp</option>
                      <option value="meeting">Meeting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Registration Link (Optional)</label>
                    <input
                      type="url"
                      value={eventForm.registrationLink}
                      onChange={(e) => setEventForm({ ...eventForm, registrationLink: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={createEventMutation.isPending}
                      className="bg-cyan-500 hover:bg-cyan-600"
                    >
                      {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowForm(false)}
                      variant="outline"
                      className="border-cyan-500/50 text-cyan-400"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <div className="grid gap-4">
              {events.map((event) => (
                <Card key={event.id} className="bg-white/5 border border-cyan-500/20 p-4">
                  <h3 className="font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{event.location}</span>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Gallery Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <Card key={image.id} className="bg-white/5 border border-cyan-500/20 overflow-hidden">
                  <img src={image.imageUrl} alt={image.title} className="w-full h-40 object-cover" />
                  <div className="p-2">
                    <h3 className="text-sm font-bold text-white truncate">{image.title}</h3>
                    <p className="text-xs text-gray-400">{image.category}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Contact Submissions</h2>
            <div className="grid gap-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="bg-white/5 border border-cyan-500/20 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-white">{contact.name}</h3>
                      <p className="text-sm text-cyan-400">{contact.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${contact.read ? 'bg-gray-500/20 text-gray-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                      {contact.read ? 'Read' : 'New'}
                    </span>
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1">{contact.subject}</h4>
                  <p className="text-gray-400 text-sm mb-2">{contact.message}</p>
                  <p className="text-xs text-gray-500">{new Date(contact.createdAt).toLocaleString()}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
