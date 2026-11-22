import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 系列枚举：新增系列先在这里注册（AGENTS.md §5）
export const SERIES = ['角色插画', '节日贺图', '封面与自设', '速写与练习'] as const;

const works = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      titleEn: z.string().optional(),
      series: z.enum(SERIES),
      year: z.number(),
      medium: z.string().default('板绘（数字插画）'),
      size: z.string().optional(),
      image: image(),
      details: z.array(image()).optional(),
      note: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      date: z.coerce.date(),
    }),
});

const news = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.enum(['展讯', '上新', '站点', '其他']).default('上新'),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content' }),
  schema: z.object({
    title: z.string().default('关于'),
  }),
});

export const collections = { works, news, about };
