# HEHXumike · 画作集

> 把每一张画，挂在它应得的墙上。

HEHXumike 的个人画作网站，基于 [Firefly](https://github.com/CuteLeaf/Firefly)（Astro）二次开发。

**线上地址：https://www.hehxumike.com/**

## 技术栈

- Firefly 6.16.9 / Astro 7 / TypeScript / Tailwind CSS 4
- pnpm、Node >= 22.23.4
- 图片优化 `astro:assets` + sharp；搜索 Pagefind；灯箱 Fancybox；页面过渡 Swup

## 站点结构

| 地址 | 内容 |
|---|---|
| `/` | 首页：banner + 资料卡 + 最新作品 + 动态 |
| `/works/` | 全部作品，支持系列筛选 |
| `/works/<slug>/` | 作品详情 |
| `/series/` | 系列 |
| `/about/` | 关于 |
| `/dynamic/` | 动态 / 短消息 |
| `/contact/` | 联系 |

已关闭：友链、留言、项目、相册、书签、追番、打赏、评论、背景音乐、看板娘。

## 当前阶段

- 10 件占位作品在 `src/content/posts/placeholder-*`，图片来自占位图库，待换原作
- 首页 banner：`src/assets/images/custom/banner.jpg`
- 头像：`src/assets/images/custom/avatar.jpg`
- Favicon：`public/favicon/hehxumike-*.png`
- 社交链接：`src/config/contactConfig.ts`（当前 `#` 占位）
- 关于文案：`src/content/spec/about.md`
- 主题色：`src/config/siteConfig.ts` 的 `themeColor.hue`（暂定 345 樱花粉）
- 预览阶段全站 `noindex`（`src/layouts/Layout.astro`），正式作品上线后移除

## 常用命令

```bash
pnpm install
pnpm dev      # http://localhost:4321/
pnpm build
pnpm preview
pnpm new:post # Firefly 文章脚手架（可选）
```

## 添加作品

1. 建 `src/content/posts/<slug>.md`，同目录放 `cover.jpg`（可再加细节图）。
2. Frontmatter 示例：

```yaml
title: 春与樱
published: 2026-11-02
description: Sakura · 角色插画 · 2026
image: ./<slug>/cover.jpg
tags: ["角色插画"]
category: 角色插画
series: 角色插画
seriesOrder: 1
pinned: false
draft: false
author: HEHXumike
comment: false
```

3. 正文放作品图与手记；图片长边 ≤ 2400、单张 ≤ 800KB。
4. 原始超清图放 `_originals/`（gitignore，不入库）。

## 部署

- GitHub 仓库：`coderirse/hehxumike`（项目站）
- Pages：GitHub Actions，Node 24 + pnpm 11.22.0
- 自定义域：`www.hehxumike.com`（`public/CNAME`）
- 阿里云 DNS：
  - `www` CNAME → `coderirse.github.io`
  - `@` A → `185.199.108.153` / `.109` / `.110` / `.111`
- apex 自动 301 到 www；HTTPS 由 GitHub Pages 证书提供
- **不要动 `coderirse.github.io`**：那是现有 Hexo 博客（caeamer.com）
- 绑定自定义域后，旧预览 `caeamer.com/hehxumike` 会停止；博客本身不受影响

## 许可

- 主题代码：[Firefly](https://github.com/CuteLeaf/Firefly)（MIT）；Astro 及依赖遵循各自许可
- 所有画作版权归 HEHXumike 本人所有