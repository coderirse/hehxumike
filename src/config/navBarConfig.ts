import type {
	NavBarConfig,
	NavBarSearchConfig,
} from "../types/navBarConfig";
import { NavBarSearchMethod } from "../types/navBarConfig";

// 画作站导航：首页 / 作品 / 系列 / 关于 / 动态 / 联系
export const navBarConfig: NavBarConfig = {
	links: [
		{ name: "首页", url: "/", icon: "material-symbols:home" },
		{ name: "作品", url: "/works/", icon: "material-symbols:palette" },
		{ name: "系列", url: "/series/", icon: "material-symbols:layers" },
		{ name: "关于", url: "/about/", icon: "material-symbols:person" },
		{
			name: "动态",
			url: "/dynamic/",
			icon: "material-symbols:forum-rounded",
		},
		{ name: "联系", url: "/contact/", icon: "material-symbols:mail" },
	],
};

export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};