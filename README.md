# HEHXumike · 个人画作作品集

> 把每一张画，挂在它应得的墙上。

**www.HEHXumike.com** — 画家 HEHXumike 的个人静态作品展示网站。纯静态、零服务器成本，部署于 GitHub Pages，绑定独立域名。目标：**惊艳、艺术气息、作品是唯一主角**。

> 状态：🚧 占位图阶段（2026-11-22）。「美术馆白」五页与「方案 R · 整站即插画」五页完整变体均已建成；根路径仍是美术馆白，R 在 `/r` 供最后对比。部署目标：`https://coderirse.github.io/hehxumike/`。

## 作品画像（设计输入）

根据画家提供的样图得出的结论：

| 维度 | 观察 | 对设计的影响 |
|---|---|---|
| 类型 | 数字插画（板绘），二次元角色 | 白底画廊衬托高饱和色彩，不需要厚重画框质感 |
| 色彩 | 樱花粉、宝蓝、靛青、暗夜哥特、夕阳橙 | 强调色从作品主色提取（候选：樱花粉 / 靛蓝），全站仅一处点缀 |
| 构图 | 多为方形 / 竖幅（约 1:1、3:4） | 瀑布流（masonry）布局 + 灯箱放大 |
| 题材 | 角色立绘、节日贺图、封面 / 自设 | 支持按「系列」筛选，贺图按年份归档 |
| 签名 | 画中常见 XUMIK / HEH 水印 | 站点署名默认 HEHXumike（待确认） |

⚠️ 样图来自社交平台截图（有压缩与平台水印），建站需要**原始高清导出文件**（PNG/JPG，长边 ≥ 2000px，无平台二压）。

## 技术选型（调研结论）

| 方案 | 仓库 / 许可证 | 优点 | 顾虑 | 结论 |
|---|---|---|---|---|
| **A. Astro 自定义站** | [astro](https://github.com/withastro/astro)（MIT）+ [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)（MIT） | 设计上限最高；内置图片管线（自动 AVIF/WebP + srcset）；官方 GitHub Pages Action；View Transitions 页面过渡；内容即 Markdown | 首版需一次定制开发 | ✅ **推荐** |
| B. Hugo 画廊主题 | [hugo-theme-gallery](https://github.com/nicokaiser/hugo-theme-gallery)（MIT） | 成熟省力；justified 布局；灯箱；免 Node | 气质偏摄影相册；中文排版需魔改；需 Hugo 工具链 | 备选 |
| C. Astro 艺术家模板 | [astro-art-portfolio](https://github.com/EmaSuriano/astro-art-portfolio)（MIT） | 专为艺术家设计 | 内容绑定 Notion API（外部服务依赖） | 备选 |
| D. Magic Portfolio | [magic-portfolio](https://github.com/once-ui-system/magic-portfolio)（**CC BY-NC 4.0**） | 设计系统完善 | ⚠️ 许可证禁止商用（个人站有卖画/接稿可能，有风险）；Next.js 较重 | ❌ 弃用 |

**选 A 的理由**：模板的「通用作品集感」很难惊艳；Astro 让我们借用开源积木（灯箱、图片优化、页面过渡）但完全掌控设计语言；本机 Node 24 开箱即用；日常维护 = 放图 + 写几行元数据 + push。

## 网站结构

```
A · 美术馆白（根路径，现状）
/          首页    — 精选大图 + 一句宣言 + 最新作品
/works     作品    — 系列筛选 + 瀑布流 + 灯箱
/about     关于    — 自述 + 肖像 + 履历 / 接稿
/news      动态    — 展讯、上新、里程碑
/contact   联系    — 五个社交渠道

R · 整站即插画（/r，五页完整变体，优先候选）
/r         首页    — 整幅场景画当界面 + 画中导航 + 方格作品墙
/r/works   作品    — 画带 + 系列筛选 + 方格墙 + 灯箱
/r/about   关于    — 画带 + 肖像与自述
/r/news    动态    — 画带 + 时间线
/r/contact 联系    — 画带 + 渠道列表

/styles    界面方案挑选（A–G + R 八套，临时页）
```

## 两套完整设计方向

### A · 美术馆白（根路径，现状）

- **底色**：暖白 `#FAFAF8`，墨色正文 `#1A1A1A`，发丝分隔线 `#E7E4DE`
- **强调色**：待作品图到位后从主色提取（候选樱花粉 / 靛蓝），全站仅一处
- **字体**：思源宋体 Noto Serif SC + EB Garamond（英文点缀），OFL 自托管
- **版式**：大留白、发丝线、作品编号、中英混排小字
- 首版用占位图开发；真实作品到位后校准强调色与首页 hero

### R · 整站即插画（`/r`，优先候选）

- 灵感来自 rossdraws.com 的设计模式（闭源 Shopify 站，**原创复刻**，不使用其任何素材）
- 首屏一整幅场景画 = 界面本身，导航词嵌在画里；热区坐标可配置
- 内页顶部一条画带，下方白底内容；作品页是 yuumei 式方格墙 + 灯箱
- 黑白灰 + 图像，无强调色；EB Garamond 做英文小字
- 真实场景画到位后替换 `src/assets/scene-placeholder.jpg` 并校准 `hotspots`

## 目录结构（规划）

```
www.HEHXumike.com/
├── .github/workflows/deploy.yml    # Pages 自动部署（Node 24 + withastro/action）
├── deploy/CNAME                    # 域名买好后再放回 public/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/portrait.jpg         # 关于页肖像（占位）
│   ├── assets/scene-placeholder.jpg# R 首屏场景（占位，待替换）
│   ├── content/                    # works / news / about
│   ├── components/                 # WorkCard / Lightbox / RCell
│   ├── data/contact.ts             # 五个社交渠道（单一来源）
│   ├── layouts/BaseLayout.astro    # A 美术馆白
│   ├── layouts/RLayout.astro       # R 整站即插画
│   ├── pages/                      # 正式五页 + b–g + r/ 五页 + styles
│   ├── styles/tokens.css           # A 设计系统
│   ├── styles/r.css                # R 设计系统
│   └── utils/url.ts                # withBase 部署前缀
├── _originals/                     # 原始超清图（gitignore，不入库）
├── AGENTS.md
└── README.md
```

## 快速开始

```bash
npm install
npm run dev       # http://localhost:4321/hehxumike/
npm run build     # 产物在 dist/（base=/hehxumike）
npm run preview   # 本地预览构建结果 http://localhost:4321/hehxumike/
```

## 如何添加一件作品

1. 建目录 `src/content/works/<slug>/`（推荐用 `npm run new:work -- "标题" --series 系列` 脚手架生成），把原始导出图（勿用平台截图）放进同一目录，命名为 `01-main.jpg`
2. 新建 `src/content/works/<slug>/index.md`：

```yaml
---
title: Happy Halloween
titleEn: Happy Halloween
series: 节日贺图
year: 2025
medium: 板绘（数字插画）
size: 2000 × 2600
image: ./01-main.png
featured: false
order: 10
---
（可选）一两句创作手记。
```

3. `git push` → GitHub Actions 自动构建发布。

原始超清文件放 `_originals/`（不入库），处理规范见 AGENTS.md §6。

## 部署：GitHub Pages + 域名绑定

**仓库**：`coderirse/hehxumike`（项目站，子路径部署）。

⚠️ `coderirse.github.io` 是现有 Hexo 博客（绑 `caeamer.com`），**不要把本项目推过去**。

- 线上地址：`https://coderirse.github.io/hehxumike/`
- `astro.config.mjs` 已设 `base: '/hehxumike'`；站内链接统一走 `src/utils/url.ts` 的 `withBase`
- Pages Source 选 **GitHub Actions**；workflow 已把 Node 设为 **24**（Astro 7 要求 ≥ 22.23.4）
- `deploy/CNAME` 暂不部署（现在放了会让 Pages 立刻跳未解析的域名）

**域名买好后**：

1. 把 `deploy/CNAME` 放回 `public/CNAME`
2. `astro.config.mjs`：`base: '/'`、`site: 'https://www.HEHXumike.com'`
3. Pages 设置 Custom domain 填 `www.HEHXumike.com`
4. DNS（域名服务商处）：

| 类型 | 主机记录 | 值 |
|---|---|---|
| CNAME | www | `coderirse.github.io` |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

5. DNS 生效后回到 Pages 勾选 **Enforce HTTPS**，等证书签发
6. 访问 `https://www.HEHXumike.com` ✅

## 国内访问说明（可选优化）

GitHub Pages 国内直连时快时慢。可把域名 DNS 托管到 **Cloudflare**（免费 CDN 代理，无需备案），国内打开速度通常明显改善。不建议国内 CDN（需 ICP 备案）。

## Roadmap

- [x] 拍板：技术方案 A（Astro）+ GitHub 用户名 `coderirse` + 站名 HEHXumike
- [x] 搭建骨架：五页 / 灯箱 / 瀑布流 / 系列筛选 / 自托管字体（2026-11-22）
- [x] 方案 R 五页完整变体（/r）+ 375 / 1440 目检（2026-11-22）
- [x] `new:work` 脚手架 / 社交链接单一来源 / 部署前缀 `withBase`
- [ ] 替换占位图：删除 `src/content/works/placeholder-*`，换入原作高清图（首批 5–10 张）
- [ ] 界面定稿：R（/r）vs A / F / G，确认后把选中方案升为根路径并删临时页
- [ ] 校准强调色、字体气质、首页 hero / R 热区
- [ ] 内容录入：作品元数据 / 自述 / 展讯 / 社交链接
- [ ] 上线 GitHub Pages（`coderirse/hehxumike`）+ 绑定域名
- [ ] （可选）Cloudflare 加速

## 许可与致谢

- 本站自有代码：MIT
- 致谢开源组件：[Astro](https://astro.build)（MIT）、[PhotoSwipe](https://photoswipe.com)（MIT）、思源宋体 / 霞鹜文楷 / EB Garamond（SIL OFL）
- 所有画作版权归画家 HEHXumike 所有
