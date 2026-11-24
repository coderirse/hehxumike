import type { ProfileConfig } from "../types/profileConfig";
import { CONTACT_LINKS } from "./contactConfig";

export const profileConfig: ProfileConfig = {
	// 头像：取自《蓝焰》的角色特写
	avatar: "assets/images/custom/avatar.jpg",

	name: "HEHXumike",

	bio: "数字插画 · 板绘。把每一张画，挂在它应得的墙上。",

	links: [
		...CONTACT_LINKS.map((link) => ({
			name: link.cn,
			icon: link.icon,
			url: link.href,
			showName: false,
		})),
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
			showName: false,
		},
	],
};