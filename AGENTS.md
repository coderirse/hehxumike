# AGENTS.md

面向在本仓库工作的 AI 编码代理（以及未来的协作者）。先读这里，再动手。

## 1. 项目一句话

HEHXumike 的个人画作网站：**Firefly（Astro）二次开发**，作品用 posts 承载，GitHub Pages 项目站部署，自定义域 **www.hehxumike.com**。

## 2. 决策记录（不要反复推翻，除非用户要求）

- **主题**：`CuteLeaf/Firefly 6.16.9`（MIT）+ Astro 7 + pnpm 11.22.0。不要换回旧的 A/R 自研方案；旧方案在 git 历史里，不再维护。
- **作品模型**：文章改作品。每件作品是一篇 `posts`；`/works/` 是全部作品（系列筛选），`/works/<slug>/` 是详情；分类 / 标签 / 系列 / 归档 / 搜索全部复用 Firefly。
- **站点模块**：只保留 首页 / 作品 / 系列 / 关于 / 动态 / 联系。关闭 friends、guestbook、projects、gallery、booknav、bilibili、bangumi、vndb、mal、sponsor；评论 `none`；背景音乐、看板娘关闭。
- **视觉**：Firefly 玻璃卡片 + 樱花粉主题（hue 345，暂定，待真实作品校准）；banner / 头像 / 作品图目前是占位。
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
src/pages/works/index.astro  # 全部作品 + 系列筛选
src/pages/works/[slug].astro # 作品详情（已隐藏侧栏 / 字数 / 顶部重复封面）
src/pages/contact.astro      # 联系
src/assets/images/custom/    # banner.jpg / avatar.jpg
public/favicon/              # hehxumike-*.png + svg
public/CNAME                 # www.hehxumike.com
scripts/                     # Firefly 构建/脚手架脚本
```

## 5. 作品 schema（Firefly posts）

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

- 封面放 `src/content/posts/<slug>/cover.jpg`；正文用相对路径 `./<slug>/cover.jpg`。
- 作品详情页的顶部封面已关闭（`coverImageConfig.enableInPost: false`），正文图片就是作品图，避免同图出现两次。
- 原图放 `_originals/`（gitignore，不入库）；不要使用 Firefly 演示站的插画/音乐/看板娘素材（已清除）。

## 6. 设计与内容约束

- 保留 Firefly 页脚 `Powered by Astro & Firefly` 与 `LICENSE`（MIT）。
- 主题色、站点信息、社交链接集中在 `src/config/`；不要硬编码进组件。
- 作品详情页的侧栏/字数/评论/许可证卡已关闭；修改前先读 `works/[slug].astro` 末尾的全局 CSS。
- 预览阶段全站 `noindex`（`src/layouts/Layout.astro`）；真实作品素材上线后移除该 meta。
- 联系页在移动端已隐藏重复的资料/公告/动态卡；首页/作品页保留 Firefly 侧栏与移动端底部组件。
- 中文为主 + 英文小字点缀；375 / 768 / 1440 不能破版。

## 7. 部署检查单

- [ ] `pnpm build` 通过
- [ ] 首页 / 作品 / 详情 / 系列 / 动态 / 关于 / 联系 / 搜索正常
- [ ] 375 与 1440 无横向溢出、无坏图
- [ ] 系列筛选、灯箱、搜索可用
- [ ] push main → Actions（Node 24 + pnpm）成功 → Pages 更新
- [ ] `https://www.hehxumike.com/` 200；apex 301；HTTPS 绿锁
- [ ] `caeamer.com` 博客不受影响

## 8. 待办（需用户提供）

- [ ] 真实首页 banner（人物 + 环境，横幅优先）
- [ ] 真实头像、首批 5–10 张原作高清图（替换 placeholder-*）
- [ ] 小红书 / 微博 / X / Instagram 真实链接（`contactConfig.ts`）
- [ ] 真实邮箱（当前 `hello@hehxumike.com` 是占位，域名暂无 MX）
- [ ] 关于 / 履历 / 接稿文案
- [ ] 主题色从主色提取、正式 favicon
- [ ] HTTPS 强制与 Lighthouse 移动端性能复核