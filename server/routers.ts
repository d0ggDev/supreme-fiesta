import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { COOKIE_NAME } from "@shared/const";
import { getPublishedBlogPosts, getBlogPostBySlug, createBlogPost, getUpcomingEvents, createEvent, createContactSubmission, getContactSubmissions, getGalleryImages, createGalleryImage, createBulkGalleryImages } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Blog API
  blog: router({
    list: publicProcedure.query(async () => {
      return getPublishedBlogPosts(20);
    }),
    getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
      return getBlogPostBySlug(input);
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        excerpt: z.string().optional(),
        category: z.string().default("announcement"),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can create blog posts");
        }
        return createBlogPost({
          ...input,
          authorId: ctx.user.id,
        });
      }),
  }),

  // Events API
  events: router({
    list: publicProcedure.query(async () => {
      return getUpcomingEvents(20);
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        location: z.string(),
        category: z.string(),
        registrationLink: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can create events");
        }
        return createEvent(input);
      }),
  }),

  // Contact API
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        return createContactSubmission(input);
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Only admins can view submissions");
      }
      return getContactSubmissions();
    }),
  }),

  // Gallery API
  gallery: router({
    list: publicProcedure.query(async () => {
      return getGalleryImages(50);
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string(),
        category: z.string(),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can add gallery images");
        }
        return createGalleryImage(input);
      }),
    bulkCreate: protectedProcedure
      .input(z.array(z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string(),
        category: z.string(),
        displayOrder: z.number().default(0),
      })))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can add gallery images");
        }
        return createBulkGalleryImages(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
