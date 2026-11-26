import type { BackgroundWallpaperConfig } from "@/types/backgroundWallpaper";
import { CONTACT_LINKS } from "./contactConfig";

// 首页 banner：《十八岁的春天》；文字靠左与暗渐变样式在 banner-home.css
const bannerLinks = CONTACT_LINKS.filter((link) =>
	["小红书", "微博", "X", "邮箱"].includes(link.cn),
).map((link) => ({
	name: link.cn,
	icon: link.icon,
	url: link.href,
	showName: false,
}));

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	mode: "banner",
	playerEnable: false,
	src: {
		desktop: "assets/images/custom/banner.jpg",
		mobile: "assets/images/custom/banner.jpg",
	},
	common: {
		dimOpacity: 0.2,
		playerMode: "random",
		homeText: {
			enable: true,
			title: "𝐇𝐄𝐇𝐗𝐮𝐦𝐢𝐤𝐞",
			titleSize: "4.5rem",
			subtitle: [
				"`⎚⩊⎚´ ﾉｼﾞ",
				"ദ്ദി◝ ⩊ ◜.ᐟ",
				"ᕙ(  •̀ ᗜ •́  )ᕗ",
			],
			note: "procreate，sai，photoshop，csp，以我时间为代价，请给予我力量",
			subtitleSize: "1.5rem",
			subtitleEffect: "fade",
			typewriter: {
				enable: true,
				speed: 100,
				deleteSpeed: 50,
				pauseTime: 2000,
			},
			linksEnable: true,
			links: [
				...bannerLinks,
				{
					name: "RSS",
					icon: "fa7-solid:rss",
					url: "/rss/",
					showName: false,
				},
			],
		},
		carousel: {
			enable: false,
			interval: 5000,
			transitionEffect: "zoom",
		},
		waves: {
			enable: {
				desktop: true,
				mobile: true,
			},
		},
		gradient: {
			enable: {
				desktop: true,
				mobile: true,
			},
			height: "10%",
		},
	},
	banner: {
		position: "center",
		postInfo: {
			mode: "description",
		},
		navbar: {
			transparentMode: "semi",
			blur: 12,
		},
	},
	overlay: {
		zIndex: -1,
		opacity: 0.8,
		blur: 10,
		cardOpacity: 0.6,
	},
	fullscreen: {
		layout: "classic",
		position: "center",
		navbar: {
			transparentMode: "semifull",
			blur: 12,
		},
		blurRamp: {
			enable: {
				desktop: true,
				mobile: true,
			},
		},
	},
};