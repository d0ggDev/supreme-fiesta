import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    },
    onError: (error) => {
      toast.error('Failed to send message. Please try again.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    submitContact.mutate(formData);
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'bitsaclub@ueab.ac.ke', link: 'mailto:bitsaclub@ueab.ac.ke' },
    { icon: Phone, title: 'President', value: '+254 708 898 899', link: 'tel:+254708898899' },
    { icon: Phone, title: 'VP', value: '+254 725 486 687', link: 'tel:+254725486687' },
  ];

  return (
    <section className="relative w-full h-full flex items-center overflow-hidden bg-gradient-to-b from-[#16213e] via-[#0f3460] to-[#1a1a2e] animate-section-enter">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Have questions? We would love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.title}
                  href={info.link}
                  className="group"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="animate-fade-in-up">
                    <Card className="bg-white/5 border border-cyan-500/20 p-4 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 flex items-center gap-4 hover:scale-105">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{info.title}</h3>
                        <p className="text-gray-400 text-xs group-hover:text-cyan-400 transition-colors">{info.value}</p>
                      </div>
                    </Card>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Card className="bg-white/5 border border-cyan-500/20 p-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Message subject"
                    className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={3}
                    className="w-full px-3 py-2 bg-white/5 border border-cyan-500/20 rounded text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 rounded text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-300"
                >
                  {submitContact.isPending ? 'Sending...' : 'Send Message'}
                  {!submitContact.isPending && <Send className="w-3 h-3" />}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sectionEnter {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-section-enter {
          animation: sectionEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
