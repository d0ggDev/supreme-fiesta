import { getDb } from "./db";
import { users, blogPosts, events, contactSubmissions, galleryImages, InsertUser, InsertBlogPost, InsertEvent, InsertContactSubmission, InsertGalleryImage } from "../drizzle/schema";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

// Helper function to generate a slug from a title
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// --- Data Generation Functions ---

const generateUser = (role: "user" | "admin"): InsertUser => ({
  openId: nanoid(20),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  loginMethod: "oauth",
  role: role,
});

const generateBlogPost = (authorId: number): InsertBlogPost => {
  const title = faker.lorem.sentence(5);
  return {
    title,
    slug: slugify(title) + "-" + nanoid(5),
    content: faker.lorem.paragraphs(5, "\\n\\n"),
    excerpt: faker.lorem.paragraph(2),
    category: faker.helpers.arrayElement(["announcement", "news", "tutorial", "event-recap"]),
    authorId,
    featured: faker.helpers.arrayElement([0, 1]),
    published: 1,
  };
};

const generateEvent = (): InsertEvent => ({
  title: faker.lorem.words(4) + " Competition",
  description: faker.lorem.paragraphs(3),
  date: faker.date.future({ years: 1 }),
  location: faker.location.streetAddress(true),
  category: faker.helpers.arrayElement(["competition", "meeting", "workshop", "social"]),
  registrationLink: faker.internet.url(),
  published: 1,
});

const generateContactSubmission = (): InsertContactSubmission => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  subject: faker.lorem.sentence(5),
  message: faker.lorem.paragraph(4),
  read: faker.helpers.arrayElement([0, 1]),
});

const generateGalleryImage = (): InsertGalleryImage => ({
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(10),
  imageUrl: faker.image.urlLoremFlickr({ category: "tech", width: 800, height: 600 }),
  category: faker.helpers.arrayElement(["hardware", "software", "team", "event"]),
  displayOrder: faker.number.int({ min: 1, max: 100 }),
  published: 1,
});

// --- Seeding Logic ---

async function seed() {
  const db = await getDb();
  if (!db) {
    console.error("Database connection failed. Check DATABASE_URL.");
    process.exit(1);
  }
  console.log("Starting database seeding...");

  // 1. Clear existing data (optional, but good for clean seeding)
  console.log("Clearing existing data...");
  await db.delete(contactSubmissions);
  await db.delete(galleryImages);
  await db.delete(events);
  await db.delete(blogPosts);
  await db.delete(users);
  console.log("Data cleared.");

  // 2. Seed Users
  const adminUser = generateUser("admin");
  const regularUser = generateUser("user");
  const insertedUsers = await db.insert(users).values([adminUser, regularUser]);
  const adminId = insertedUsers[0].insertId;
  console.log(`Seeded ${insertedUsers.length} users. Admin ID: ${adminId}`);

  // 3. Seed Blog Posts
  const posts: InsertBlogPost[] = Array.from({ length: 10 }, () =>
    generateBlogPost(adminId)
  );
  await db.insert(blogPosts).values(posts);
  console.log(`Seeded ${posts.length} blog posts.`);

  // 4. Seed Events
  const seededEvents: InsertEvent[] = Array.from({ length: 8 }, () => generateEvent());
  await db.insert(events).values(seededEvents);
  console.log(`Seeded ${seededEvents.length} events.`);

  // 5. Seed Contact Submissions
  const submissions: InsertContactSubmission[] = Array.from({ length: 15 }, () =>
    generateContactSubmission()
  );
  await db.insert(contactSubmissions).values(submissions);
  console.log(`Seeded ${submissions.length} contact submissions.`);

  // 6. Seed Gallery Images
  const images: InsertGalleryImage[] = Array.from({ length: 20 }, () =>
    generateGalleryImage()
  );
  await db.insert(galleryImages).values(images);
  console.log(`Seeded ${images.length} gallery images.`);

  console.log("Database seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Database seeding failed:", err);
  process.exit(1);
});
