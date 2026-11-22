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
- 部署：GitHub Actions（`withastro/action` + `actions/deploy-pages`）→ GitHub Pages。`public/CNAME` 固定为 `www.HEHXumike.com`，**勿删勿改**。
- 作品是插画：布局用瀑布流（masonry），不要假设都是横图（常见 1:1、3:4）。
- 状态：骨架已于 2026-11-22 建成，构建与浏览器目检（首页 / 作品 / 灯箱 / 移动端）均通过。

## 3. 常用命令

```bash
npm install
npm run dev       # 本地开发 http://localhost:4321
npm run build     # 产线构建 → dist/
npm run preview   # 预览构建产物
npm run new:work  # （待建）作品脚手架：建目录 + frontmatter 模板
```

## 4. 目录约定

```
src/
├── assets/portrait.jpg           # 关于页肖像
├── content/
│   ├── works/<slug>/             # 每件作品一个目录：index.md（元数据）+ 图片（01-main.*、02-detail-1.* …）
│   ├── news/*.md                 # 展讯 / 动态
│   └── about.md                  # 艺术家自述
├── components/                   # WorkCard（挂画卡）/ Lightbox（灯箱）
├── layouts/BaseLayout.astro      # 字体 / 页头 / 页脚 / 滚动浮入
├── pages/                        # index.astro / works.astro / about.astro / news.astro / contact.astro
└── styles/tokens.css             # 设计 tokens + 全局样式
public/
├── CNAME                         # www.HEHXumike.com（勿动）
└── favicon.svg
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
7. **不要修改**：`public/CNAME`、`.github/workflows/deploy.yml`（除非用户明确要求）。
8. **不要提交**：`_originals/`、`node_modules/`、任何 > 5MB 文件。
9. 保持纯静态：不引入需要服务端运行时的功能。

## 9. 部署检查单

push `main` → Actions 构建部署 → 逐项确认：

- [ ] 五个页面正常（首页 / 作品 / 关于 / 动态 / 联系）
- [ ] 灯箱可开合、键盘可导航
- [ ] 移动端瀑布流不破版
- [ ] `https://www.HEHXumike.com` HTTPS 绿锁正常

## 10. 未决事项（动工前需用户确认）

- [x] 技术方案：Astro 自定义（已动工建成骨架）
- [x] GitHub 用户名：`coderirse`（仓库建议 `coderirse.github.io`）
- [x] 站名 / 署名：HEHXumike
- [ ] 首批原始高清作品图（5–10 张，非平台截图）→ 替换 `content/works/placeholder-*`
- [ ] 真实社交链接（`src/pages/contact.astro` 内 TODO 注释处）与真实肖像（`src/assets/portrait.jpg`）
- [ ] 自述 / 履历 / 接稿文案（`src/content/about.md` 内 TODO 注释处）
- [ ] 强调色校准：原作到位后从主色提取，替换 tokens.css 的 `--accent`
- [ ] 界面方案定稿：用户已表态喜欢 **rossdraws.com**（整站即插画）方向。侦察确认：rossdraws.com 为 **Shopify 定制主题、闭源、无公开仓库**——不可扒站二次开发（插画/代码/动效均为其版权资产），走**原创复刻**：已建方案 R `/r`（首屏整幅画 + 画中导航热区 + yuumei 式方格作品墙；热区坐标配置在 `r.astro` 的 `hotspots` 数组，真实场景画到位后按构图校准）。备选 A–G 仍在 `/styles`。**待用户提供**：一张适合当首页的场景插画（人物+环境，横幅优先）。选定 R 后：按其气质把五个正式页面落成全站，删除其余临时方案页与 /styles。教训：仅换配色被否决；用户要结构级差异且气质同频。
