import { z } from 'zod';

export const QuizSchema = z.object({
  id: z.number(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  difficulty: z.union([
    z.literal('easy').transform(() => '하'),
    z.literal('medium').transform(() => '중'),
    z.literal('hard').transform(() => '상'),
  ]),
  created_at: z.string(),
  updated_at: z.string(),
});

export const QuizTableSchema = QuizSchema.extend({
  success: z.boolean().optional(),
});

export type Quiz = z.infer<typeof QuizSchema>;
export type QuizTable = z.infer<typeof QuizTableSchema>;
