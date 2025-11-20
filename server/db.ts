import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

import { desc, and } from "drizzle-orm";
import { blogPosts, events, contactSubmissions, galleryImages, BlogPost, Event, ContactSubmission, GalleryImage } from "../drizzle/schema";

// Blog queries
export async function getPublishedBlogPosts(limit = 10): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, 1))
    .orderBy(desc(blogPosts.createdAt))
    .limit(limit);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, 1)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: any): Promise<BlogPost | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(blogPosts).values(post);
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, post.slug)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create blog post:", error);
    return null;
  }
}

// Event queries
export async function getUpcomingEvents(limit = 10): Promise<Event[]> {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(events)
    .where(eq(events.published, 1))
    .orderBy(events.date)
    .limit(limit);
}

export async function createEvent(event: any): Promise<Event | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(events).values(event);
    const result = await db.select().from(events).orderBy(desc(events.createdAt)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create event:", error);
    return null;
  }
}

// Contact submission queries
export async function createContactSubmission(submission: any): Promise<ContactSubmission | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(contactSubmissions).values(submission);
    const result = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create contact submission:", error);
    return null;
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

// Gallery queries
export async function getGalleryImages(limit = 10): Promise<GalleryImage[]> {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.published, 1))
    .orderBy(galleryImages.displayOrder)
    .limit(limit);
}

export async function createGalleryImage(image: any): Promise<GalleryImage | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(galleryImages).values(image);
    const result = await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create gallery image:", error);
    return null;
  }
}

export async function createBulkGalleryImages(images: any[]): Promise<GalleryImage[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    await db.insert(galleryImages).values(images);
    const result = await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt)).limit(images.length);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create bulk gallery images:", error);
    return [];
  }
}
