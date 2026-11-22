// 站内链接统一加部署前缀：GitHub Pages 项目站部署在 /hehxumike 子路径，
// 绑定自定义域名后把 astro.config.mjs 的 base 改回 '/' 即可。
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export const withBase = (path: string) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (BASE && (p === BASE || p.startsWith(`${BASE}/`))) return p;
  return `${BASE}${p}`;
};