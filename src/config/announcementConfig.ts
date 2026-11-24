import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	title: "画作集上线",
	content:
		"八幅作品已挂上墙：角色、风景与幻想，按系列慢慢看。",
	closable: true,
	link: {
		enable: true,
		text: "开始看画",
		url: "/works/",
		external: false,
	},
};