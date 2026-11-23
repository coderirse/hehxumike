import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	title: "画作集上线",
	content:
		"先把手边的画挂上墙；原作高清图与更多系列随后补上。",
	closable: true,
	link: {
		enable: true,
		text: "开始看画",
		url: "/works/",
		external: false,
	},
};