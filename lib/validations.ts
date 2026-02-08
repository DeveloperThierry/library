"use client"
import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  // coverColor: z
  //   .string()
  //   .trim()
  //   .regex(/^#[0-9A-F]{6}$/i),
  coverColor: z
  .string()
  .trim()
  .regex(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i, {
    message: "Primary color must be a valid hex code (e.g., #000000)",
  }),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
});