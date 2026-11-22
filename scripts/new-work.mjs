#!/usr/bin/env node
// 新作品脚手架：npm run new:work -- "标题" [--en "English"] [--series 系列] [--year 2026]
// 示例：npm run new:work -- "Happy Halloween" --en "All Hallows" --series 节日贺图
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  return i > -1 ? argv[i + 1] : undefined;
};
const title = argv.find((a) => !a.startsWith('--') && a !== flag('--en') && a !== flag('--series') && a !== flag('--year'));

if (!title) {
  console.error('用法：npm run new:work -- "作品标题" [--en "English Title"] [--series 系列] [--year 2026]');
  process.exit(1);
}

const SERIES = ['角色插画', '节日贺图', '封面与自设', '速写与练习'];
const series = flag('--series') ?? '角色插画';
if (!SERIES.includes(series)) {
  console.error(`未知系列「${series}」，可选：${SERIES.join(' / ')}（新增系列请先在 src/content.config.ts 注册）`);
  process.exit(1);
}

const titleEn = flag('--en');
const year = Number(flag('--year') ?? new Date().getFullYear());

const slug = title.replace(/[\\/:*?"<>|\s]+/g, '-').toLowerCase();
const dir = join('src', 'content', 'works', slug);
if (existsSync(dir)) {
  console.error(`已存在：${dir}`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const lines = [
  '---',
  `title: ${title}`,
  ...(titleEn ? [`titleEn: ${titleEn}`] : []),
  `series: ${series}`,
  `year: ${year}`,
  'medium: 板绘（数字插画）',
  'size: ""  # 画布像素，如 2400 × 3000',
  'image: ./01-main.jpg  # 把主图放进本目录并保持此文件名',
  'featured: false',
  'order: 0',
  `date: ${today}`,
  '---',
  '',
  '<!-- 可选：一两句创作手记 -->',
  '',
];
writeFileSync(join(dir, 'index.md'), lines.join('\n'));
console.log(`✔ 已创建 ${dir}`);
console.log('  下一步：把 01-main.jpg（长边 ≤ 2400px、≤ 800KB）放进该目录，补全 frontmatter。');
