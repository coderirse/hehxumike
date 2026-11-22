// @ts-check
import { defineConfig } from 'astro/config';

// 项目站仓库 coderirse/hehxumike → https://coderirse.github.io/hehxumike/
// 域名买好并绑定 www.HEHXumike.com 后：base 改回 '/'，site 改为 https://www.HEHXumike.com，
// 并把 deploy/CNAME 放回 public/（现在放了会让 Pages 立刻跳未解析的域名）
export default defineConfig({
  site: 'https://coderirse.github.io',
  base: '/hehxumike',
  trailingSlash: 'never',
  prefetch: { prefetchAll: true },
});
