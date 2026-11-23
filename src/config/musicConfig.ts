import type { MusicPlayerConfig } from "../types/musicConfig";

// 画作站不启用背景音乐，避免自动播放与额外资源
export const musicPlayerConfig: MusicPlayerConfig = {
	showInNavbar: false,
	showInSidebar: false,
	mode: "local",
	volume: 0.7,
	playMode: "list",
	showLyrics: false,
	local: {
		playlist: [],
	},
};