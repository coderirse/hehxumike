# HEHXumike · 个人画作作品集

> 把每一张画，挂在它应得的墙上。

**www.HEHXumike.com** — 画家 HEHXumike 的个人静态作品展示网站。纯静态、零服务器成本，部署于 GitHub Pages，绑定独立域名。目标：**惊艳、艺术气息、作品是唯一主角**。

> 状态：🚧 骨架已建成（2026-11-22，占位图阶段），待原作高清图替换。技术选型见下方对比。

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
/          首页    — 精选大图 + 一句宣言 + 最新动态入口
/works     作品    — 系列筛选 + 瀑布流 + 灯箱（标题 / 年份 / 画种 / 尺寸）
/about     关于    — 艺术家自述 + 肖像 + 履历 / 接稿说明
/news      动态    — 展讯、上新、里程碑时间线
/contact   联系    — 小红书 / 微博 / X / Instagram / 邮箱
```

## 设计方向：美术馆白

- **底色**：暖白 `#FAFAF8`，墨色正文 `#1A1A1A`，发丝分隔线 `#E7E4DE`
- **强调色**：待作品图到位后从主色提取（候选樱花粉 / 靛蓝），全站仅一处
- **字体**：思源宋体 Noto Serif SC + 霞鹜文楷（中文）、EB Garamond（英文点缀），全部 OFL 开源许可，自托管子集化
- **动效**：极克制 — 缓慢淡入、View Transitions 页面过渡、灯箱缩放，均 ≤ 300ms
- **版式**：大留白、发丝线、作品编号（01 / 02…）、中英混排小字点缀

首版用占位图开发；真实作品到位后校准强调色与首页 hero 排版。

## 目录结构（规划）

```
www.HEHXumike.com/
├── .github/workflows/deploy.yml    # Pages 自动部署（withastro/action）
├── public/
│   ├── CNAME                       # www.HEHXumike.com（勿删）
│   ├── fonts/                      # 子集化后的中英文字体（自托管）
│   └── favicon.svg
├── src/
│   ├── assets/portrait.jpg         # 关于页肖像（占位）
│   ├── content/
│   │   ├── works/<slug>/           # 每件作品一个目录：index.md + 图片（01-main.* …）
│   │   ├── news/*.md               # 展讯 / 动态
│   │   └── about.md                # 艺术家自述
│   ├── components/                 # WorkCard（挂画卡）/ Lightbox（灯箱）
│   ├── layouts/BaseLayout.astro    # 字体 / 页头 / 页脚 / 滚动浮入
│   ├── pages/                      # index / works / about / news / contact
│   └── styles/tokens.css           # 设计 tokens + 全局样式
├── _originals/                     # 原始超清图（gitignore，不入库）
├── AGENTS.md                       # 给 AI 代理的工程约定
└── README.md
```

## 快速开始

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # 产物在 dist/
npm run preview   # 本地预览构建结果
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

**仓库**（二选一）：

- ✅ 推荐：`coderirse.github.io`（用户站点，根路径部署，绑域名零配置）
- 备选：仓库直接命名 `www.HEHXumike.com`（需在 astro.config 配 base 路径）

**步骤**：

1. push 代码 → 仓库 Settings → Pages → Source 选 **GitHub Actions**
2. 站点首次上线于 `https://coderirse.github.io`
3. Pages 设置中 Custom domain 填 `www.HEHXumike.com`（`public/CNAME` 已含）
4. 购买域名后配置 DNS（在域名服务商处）：

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
- [x] 搭建骨架：设计 tokens / 五个页面 / 灯箱 / 瀑布流 / 系列筛选 / 自托管字体（2026-11-22）
- [ ] 替换占位图：删除 `src/content/works/placeholder-*`，换入原作高清图（你提供首批 5–10 张）
- [ ] 校准强调色、字体气质、首页 hero
- [ ] 内容录入：作品元数据 / 自述 / 展讯 / 社交链接
- [ ] 上线 GitHub Pages + 绑定域名
- [ ] （可选）Cloudflare 加速、`new:work` 脚手架脚本

## 许可与致谢

- 本站自有代码：MIT
- 致谢开源组件：[Astro](https://astro.build)（MIT）、[PhotoSwipe](https://photoswipe.com)（MIT）、思源宋体 / 霞鹜文楷 / EB Garamond（SIL OFL）
- 所有画作版权归画家 HEHXumike 所有
