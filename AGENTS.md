# AGENTS.md

面向在本仓库工作的 AI 编码代理（以及未来的协作者）。先读这里，再动手。

## 1. 项目一句话

画家 HEHXumike 的个人静态作品集（二次元风格数字插画 / 板绘），部署于 GitHub Pages，绑定域名 **www.HEHXumike.com**。目标：惊艳、艺术气息、作品是唯一主角。用户是画家本人，请用中文交流。

## 2. 决策记录（不要反复推翻，除非用户要求）

- 技术栈：**Astro（静态输出）+ PhotoSwipe 灯箱 + 手写 CSS 设计系统**。不引入 React/Vue/Tailwind/大型 UI 框架，除非用户明确要求。
- 视觉基调：**美术馆白**（暖白底、墨色字、大留白、衬线体）。强调色待真实作品图到位后从主色提取（候选：樱花粉 / 靛蓝），全站仅一处使用。
- 板块：首页 / 作品 / 关于 / 动态 / 联系。**无博客**。
- 语言：中文为主 + 英文点缀（小型大写衬线英文作装饰性小标）。不做完整 i18n。
- 许可红线：**不引入 CC BY-NC 等禁止商用许可的模板 / 依赖**（magic-portfolio 已调研并因许可排除）。个人站存在卖画 / 接稿可能。
- 部署：GitHub Actions（`withastro/action` + `actions/deploy-pages`）→ GitHub Pages 项目仓库 **`coderirse/hehxumike`**，暂挂 **`https://caeamer.com/hehxumike/`**（项目站继承用户站 caeamer.com 的自定义域名；`coderirse.github.io/hehxumike/` 会 301 过来），`base: '/hehxumike'`。**`coderirse.github.io` 是现有 Hexo 博客（绑 caeamer.com），绝不可把本项目推过去**。`deploy/CNAME` 暂存不部署，域名买好后再放回 `public/CNAME` 并把 `base` 改回 `/`。
- 作品是插画：布局用瀑布流（masonry），不要假设都是横图（常见 1:1、3:4）。
- 状态：骨架与「美术馆白」五页已于 2026-11-22 建成；同日完成 **方案 R 五页完整变体**（`/r`、`/r/works`、`/r/about`、`/r/news`、`/r/contact`），375 / 1440 目检、筛选与灯箱实测通过。根路径仍是 A（美术馆白），待用户最后对比后决定是否把 R 升为正式站。

## 3. 常用命令

```bash
npm install
npm run dev       # 本地开发 http://localhost:4321/hehxumike/
npm run build     # 产线构建 → dist/（base=/hehxumike）
npm run preview   # 预览构建产物 http://localhost:4321/hehxumike/
npm run new:work  # 作品脚手架：建目录 + frontmatter 模板
```

## 4. 目录约定

```
src/
├── assets/portrait.jpg           # 关于页肖像
├── assets/scene-placeholder.jpg  # R 首屏场景占位（真实场景画到位后替换）
├── content/
│   ├── works/<slug>/             # 每件作品一个目录：index.md（元数据）+ 图片（01-main.*、02-detail-1.* …）
│   ├── news/*.md                 # 展讯 / 动态
│   └── about.md                  # 艺术家自述
├── components/                   # WorkCard（挂画卡）/ Lightbox（灯箱）/ RCell（R 方格）
├── data/contact.ts               # 五个社交渠道（/contact 与 /r/contact 共用）
├── layouts/BaseLayout.astro      # A 美术馆白
├── layouts/RLayout.astro         # R 整站即插画（内页画带）
├── pages/                        # 正式五页 + 方案页 b–g + styles + r/ 五页
├── styles/tokens.css             # A 设计 tokens + 全局样式
├── styles/r.css                  # R 变体样式
└── utils/url.ts                  # withBase：部署前缀（/hehxumike）
public/
├── favicon.svg
└── robots.txt
deploy/
└── CNAME                         # www.HEHXumike.com；域名买好后再放回 public/
_originals/                       # 原始超清图（gitignore，不入库）
scripts/new-work.mjs              # npm run new:work 脚手架
```

## 5. 作品元数据 schema（content collection 校验，必须遵守）

```yaml
title:    string   # 必填，中文标题
titleEn:  string   # 可选，英文标题（灯箱 / 悬停时点缀显示）
series:   enum     # 系列：角色插画 / 节日贺图 / 封面与自设 / 速写与练习（新增系列先在 config 注册）
year:     number   # 必填
medium:   string   # 默认「板绘（数字插画）」
size:     string   # 画布像素，如 "2000 × 2600"
image:    image()  # 必填，主图相对路径 ./01-main.png
details:  image[]  # 可选，细节图
note:     string   # 可选，一两句创作手记
featured: boolean  # 上首页精选
order:    number   # 系列内排序
date:     date     # 完成日期，用于「动态」聚合
```

图片命名：`01-main.*`、`02-detail-1.*` …；jpg / png / webp 均可，构建时统一优化。

## 6. 图片处理规范（重要）

- **git 只存展示图**：长边 ≤ 2400px、单张 ≤ 800KB（目标 ≤ 350KB）。
- **原始超清文件不入库**：放 `_originals/` 或仓库外。用户社交平台截图不可直接使用（平台二次压缩 + 水印）。
- **占位作品目录为 `content/works/placeholder-*`**：真实作品到位后整目录删除，用 `npm run new:work` 生成正式条目；勿把占位路径写死在组件里。
- 缩略图 / AVIF / WebP / srcset 全部交给 `astro:assets` 自动生成，**不要手工做缩略图**。
- 首页 hero 图是 LCP 元素：`<Image loading="eager" fetchpriority="high">`；其余一律 `loading="lazy"`。

## 7. 设计系统基线（styles/tokens.css）

```css
--bg:     #FAFAF8;  /* 暖白 */
--ink:    #1A1A1A;  /* 正文 */
--muted:  #6B6B6B;  /* 次要文字 */
--line:   #E7E4DE;  /* 发丝线 */
--accent: 待定;      /* 真实作品图到位后从主色提取；全站仅一处点缀 */
```

- 字体（自托管，**勿引 Google Fonts CDN**，国内不可用）：经 @fontsource 包引入 Noto Serif SC（400/600）与 EB Garamond（400/500/italic），中文按 unicode-range 分片按需加载。霞鹜文楷为可选点缀字体，暂未启用。
- 间距 8px 网格；动效只做 opacity / transform，≤ 300ms ease-out。
- 中英混排：英文点缀用小型大写 + `letter-spacing: .12em` + 更小字号 + muted 色。

## 8. 行为守则

1. 依赖最少化：CSS 能解决不引库；新依赖需说明理由并确认许可证。
2. 保持文件既有风格：中文注释、现有命名习惯。
3. 任何改动后 `npm run build` 必须通过再交付。
4. 性能预算：Lighthouse 移动端 Performance ≥ 90；首页图片总传输 < 1.5MB。
5. 响应式必须覆盖 375 / 768 / 1440；中英混排不破版（长英文串可换行）。
6. 占位图阶段：占位资源集中在 `src/assets/works/_placeholder/`，**勿把占位图路径写死在组件里**，真实作品要能一键替换。
7. **不要修改**：`.github/workflows/deploy.yml`（Node 24 已按 Astro 7 要求设好）、`deploy/CNAME`（域名阶段专用），除非用户明确要求。
8. **不要提交**：`_originals/`、`node_modules/`、任何 > 5MB 文件。
9. 保持纯静态：不引入需要服务端运行时的功能。

## 9. 部署检查单

push `main` → Actions 构建部署 → 逐项确认：

- [ ] 五个页面正常（首页 / 作品 / 关于 / 动态 / 联系）
- [ ] R 变体五页正常（`/r/works`、`/r/about`、`/r/news`、`/r/contact`）
- [ ] 灯箱可开合、键盘可导航
- [ ] 移动端 375 / 桌面 1440 不破版
- [ ] `https://caeamer.com/hehxumike/` 可访问（github.io 链接 301 过去）；绑域名后 `https://www.HEHXumike.com` HTTPS 绿锁正常

## 10. 未决事项（动工前需用户确认）

- [x] 技术方案：Astro 自定义（已动工建成骨架）
- [x] GitHub 用户名：`coderirse`（仓库建议 `coderirse.github.io`）
- [x] 站名 / 署名：HEHXumike
- [ ] 首批原始高清作品图（5–10 张，非平台截图）→ 替换 `content/works/placeholder-*`
- [ ] 真实社交链接（`src/pages/contact.astro` 内 TODO 注释处）与真实肖像（`src/assets/portrait.jpg`）
- [ ] 自述 / 履历 / 接稿文案（`src/content/about.md` 内 TODO 注释处）
- [ ] 强调色校准：原作到位后从主色提取，替换 tokens.css 的 `--accent`
- [ ] 界面方案定稿：用户喜欢 **rossdraws.com**（整站即插画）方向；侦察确认其为 **Shopify 定制主题、闭源**，不可扒站，走**原创复刻**。已完成：
  - 方案 R 五页完整变体：`/r`（首屏整幅画 + 画中导航热区）、`/r/works`（筛选 + 方格墙 + 灯箱）、`/r/about`、`/r/news`、`/r/contact`；共享 `RLayout` / `RCell` / `styles/r.css`
  - 根路径仍是 A 美术馆白；`/styles` 保留 A–G + R 八套供最后对比
  - 热区坐标在 `src/pages/r/index.astro` 的 `hotspots` 数组，真实场景画到位后按构图校准
  - **待用户提供**：一张场景插画（人物 + 环境，横幅优先）
  - 用户定稿后：把 R 五页升为正式根路径、删除其余方案页与 `/styles`，或按用户选择改走其他方案
  教训：仅换配色被否决；用户要结构级差异且气质同频。
- [ ] 部署：`coderirse/hehxumike` 项目仓库 + Pages（GitHub Actions）已上线 → **`https://caeamer.com/hehxumike/`**（继承博客域名；github.io 链接 301）；**不要动 `coderirse.github.io`（现有博客，绑 caeamer.com）**。
