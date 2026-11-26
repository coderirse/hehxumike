# AGENTS.md

面向在本仓库工作的 AI 编码代理（以及未来的协作者）。先读这里，再动手。

## 1. 项目一句话

HEHXumike 的个人画作网站：**Firefly（Astro）二次开发**，作品用 posts 承载，GitHub Pages 项目站部署，自定义域 **www.hehxumike.com**。

## 2. 决策记录（不要反复推翻，除非用户要求）

- **主题**：`CuteLeaf/Firefly 6.16.9`（MIT）+ Astro 7 + pnpm 11.22.0。不要换回旧的 A/R 自研方案；旧方案在 git 历史里，不再维护。
- **作品模型**：文章改作品。每件作品是一篇 `posts`；`/works/` 是全部作品（系列筛选），`/works/<slug>/` 是详情；分类 / 标签 / 系列 / 归档 / 搜索全部复用 Firefly。
- **站点模块**：只保留 首页 / 作品 / 系列 / 关于 / 动态 / 联系。关闭 friends、guestbook、projects、gallery、booknav、bilibili、bangumi、vndb、mal、sponsor；评论 `none`；背景音乐、看板娘关闭。
- **视觉**：Firefly 玻璃卡片 + 深蓝（hue 250）+ 绯红主色（`variables.styl` 固定 `--primary`）；banner 用《十八岁的春天》，头像用作者提供的黑白白发头像，副标题为三条颜文字轮播，下方为作者工具签名，8 张真实作品已上线。
- **作品列表**：`/works/` 为无侧栏全宽瀑布流（4/2/1 列），保持原图比例；首页保留 Firefly 侧栏，作品为 2 列瀑布流。系列筛选、暗色模式、详情页灯箱均已验证。
- **部署**：GitHub Pages 项目仓库 `coderirse/hehxumike`；自定义域 `www.hehxumike.com`；apex 用 A 记录并 301 到 www；`public/CNAME` 固化域名。**绝不动 `coderirse.github.io`（现有博客，绑 caeamer.com）**。
- **旧预览**：`caeamer.com/hehxumike` 会随自定义域切换停止；博客本身不受影响。

## 3. 常用命令

```bash
pnpm install
pnpm dev       # http://localhost:4321/
pnpm build     # 构建到 dist/（含 Pagefind、OG、字体子集化）
pnpm preview
pnpm new:post  # Firefly 文章脚手架（可选）
```

- Node >= 22.23.4（本地 Node 24）；pnpm 11.22.0。
- 构建可能 1–3 分钟；图片多时更长。

## 4. 目录约定

```
src/config/                  # siteConfig / profile / navBar / backgroundWallpaper / contactConfig / sidebar ...
src/content/posts/           # 作品：<slug>.md + <slug>/cover.jpg（+ 细节图）
src/content/dynamic/         # 动态
src/content/spec/about.md    # 关于
src/pages/works/index.astro  # 全部作品 + 系列筛选（无侧栏瀑布流）
src/pages/works/[slug].astro # 作品详情（隐藏侧栏；桌面端内容区不重复 banner 标题）
src/components/layout/WorkCard.astro   # 作品卡（原图比例、悬停 CTA）
src/components/layout/WorkGallery.astro # CSS columns 瀑布流
src/pages/contact.astro      # 联系
src/assets/images/custom/    # banner.jpg / avatar.jpg
public/favicon/              # hehxumike-*.png + svg
public/CNAME                 # www.hehxumike.com
_originals/                  # 原 PNG / 网页 JPEG / 旧占位（gitignore，不入库）
scripts/                     # Firefly 构建/脚手架脚本
```

## 5. 作品 schema（Firefly posts）

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

- `order` 控制首页/作品页的策展顺序（越小越靠前）；`seriesOrder` 只控制系列内顺序。
- 当前 8 件：角色插画 6（十八岁的春天 𝙃𝙖𝙥𝙥𝙮 18𝙩𝙝 𝙗𝙞𝙧𝙩𝙝𝙙𝙖𝙮、暮色将至 𝐓𝐡𝐞 𝐬𝐮𝐧𝐬𝐞𝐭、蓝焰 𝐓𝐞𝐚𝐫𝐬、白花之庭 𝑖𝑛 𝑡ℎ𝑒 𝑝𝑎𝑠𝑡、废墟之上 𝙗𝙖𝙧𝙧𝙚𝙣、白夜 𝗦𝘁𝗮𝗿𝘁）、风景 1（日照金山 𝐆𝐨𝐥𝐝𝐞𝐧 𝐇𝐨𝐮𝐫）、幻想 1（夜之冠 𝕯𝖆𝖗𝖐𝕹𝖎𝖌𝖍𝖙）。展示标题以英文花体为准，中文名用于索引和说明。

- 封面放 `src/content/posts/<slug>/cover.jpg`；正文用相对路径 `./<slug>/cover.jpg`。
- 作品详情页的顶部封面已关闭（`coverImageConfig.enableInPost: false`），正文图片就是作品图，避免同图出现两次。
- 原图放 `_originals/`（gitignore，不入库）；不要使用 Firefly 演示站的插画/音乐/看板娘素材（已清除）。

## 6. 设计与内容约束

- 保留 Firefly 页脚 `Powered by Astro & Firefly` 与 `LICENSE`（MIT）。
- 主题色、站点信息、社交链接集中在 `src/config/`；不要硬编码进组件。
- 作品详情页的侧栏/字数/评论/许可证卡已关闭；修改前先读 `works/[slug].astro` 末尾的全局 CSS。
- 全站 `noindex` 已移除；主要页面可被搜索引擎与 Pagefind 索引。
- `/works/` 通过 `:has(.works-index-shell)` 隐藏左右侧栏；首页保留 Firefly 侧栏与移动端底部组件；联系页移动端隐藏重复资料卡。
- 桌面端作品详情由 banner 显示标题/简介，内容区标题已隐藏（`post-heading`），避免重复。
- 作品主标题使用截图同款英文花体；中文描述、系列、标签保留。
- 中文为主 + 英文小字点缀；375 / 768 / 1440 不能破版。

## 7. 部署检查单

- [ ] `pnpm build` 通过
- [ ] 首页 / 作品 / 详情 / 系列 / 动态 / 关于 / 联系 / 搜索正常
- [ ] 375 / 768 / 1440 无横向溢出、无坏图；暗色模式正常
- [ ] 系列筛选（角色插画 6 / 风景 1 / 幻想 1）、灯箱、Pagefind 搜索可用
- [ ] push main → Actions（Node 24 + pnpm）成功 → Pages 更新
- [ ] `https://www.hehxumike.com/` 200；apex 301；HTTPS 绿锁
- [ ] `caeamer.com` 博客不受影响

## 8. 待办（需用户提供）

- [ ] 小红书 / 微博 / X / Instagram 真实链接（`contactConfig.ts` 当前为 `#`，banner 图标同样引用）
- [ ] 真实邮箱（当前 `hello@hehxumike.com` 是占位，域名暂无 MX）
- [ ] 关于 / 履历 / 接稿文案校准（`src/content/spec/about.md` 仍有示例性履历）
- [ ] 正式 favicon（当前为占位图形）
- [ ] 作品创作年份 / 媒介信息校准（当前统一显示 2026）
- [ ] HTTPS 强制与 Lighthouse 移动端性能复核