// @ts-check
import { defineConfig } from 'astro/config';

// GitHub 用户站点仓库：coderirse.github.io（根路径部署，绑定域名无需改 base）
export default defineConfig({
  site: 'https://coderirse.github.io',
  trailingSlash: 'never',
  prefetch: { prefetchAll: true },
});
