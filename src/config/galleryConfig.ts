import type { GalleryConfig } from "@/types/galleryConfig";

// 精简作品站不启用相册模块；作品统一走 /works/（posts 内容模型）
export const galleryConfig: GalleryConfig = {
	albums: [],
	columnWidth: 240,
};