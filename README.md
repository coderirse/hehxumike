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
| `/` | 首页：banner + 资料卡 + 作品瀑布流 + 动态 |
| `/works/` | 全部作品，全宽瀑布流，支持系列筛选 |
| `/works/<slug>/` | 作品详情 |
| `/series/` | 系列 |
| `/about/` | 关于 |
| `/dynamic/` | 动态 / 短消息 |
| `/contact/` | 联系 |

已关闭：友链、留言、项目、相册、书签、追番、打赏、评论、背景音乐、看板娘。

## 当前阶段

- 8 件真实作品已上线：角色插画 6 / 风景 1 / 幻想 1，标题使用截图同款英文花体，保持原图比例瀑布流
- 首页 banner 用《十八岁的春天》，头像用作者提供的黑白白发头像
- 首页副标题为三条颜文字淡入淡出轮播，下方固定作者工具签名（procreate / sai / photoshop / csp）；OG 图里的花体标题会自动转普通英文，避免缺字
- Favicon：`public/favicon/hehxumike-*.png`（正式图标待补）
- 社交链接：`src/config/contactConfig.ts`（当前 `#` 占位）
- 关于文案：`src/content/spec/about.md`
- 主题：深蓝（hue 250）+ 绯红主色；主色固定在 `src/styles/variables.styl`
- 全站 `noindex` 已移除

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
title: 𝐆𝐨𝐥𝐝𝐞𝐧 𝐇𝐨𝐮𝐫
published: 2026-11-24T00:00:00.000Z
description: 雪山、湖面与两个人的黄昏。
image: ./golden-mountain/cover.jpg
tags: ["风景", "数字插画"]
category: 风景
series: 风景
seriesOrder: 1
order: 2
pinned: false
draft: false
author: HEHXumike
comment: false
```

- `order` 控制首页/作品页策展顺序，`seriesOrder` 控制系列内顺序。
- `title` 可以直接用英文花体；建议在 `description` 保留中文说明。
- 正文放作品图与手记；图片长边 ≤ 2400、单张 ≤ 800KB。
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