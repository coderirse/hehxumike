// 社交渠道单一来源：/contact 页面、侧栏资料卡、首页 banner 共用
// TODO(用户)：拿到真实主页地址后替换 href（当前 # 为占位）
export type ContactLink = {
	cn: string;
	en: string;
	handle: string;
	href: string;
	icon: string;
};

export const CONTACT_LINKS: ContactLink[] = [
	{
		cn: "小红书",
		en: "Xiaohongshu",
		handle: "@HEHXumike",
		href: "#",
		icon: "simple-icons:xiaohongshu",
	},
	{
		cn: "微博",
		en: "Weibo",
		handle: "@HEHXumike",
		href: "#",
		icon: "simple-icons:sinaweibo",
	},
	{
		cn: "X",
		en: "Twitter / X",
		handle: "@HEHXumike",
		href: "#",
		icon: "simple-icons:x",
	},
	{
		cn: "Instagram",
		en: "Instagram",
		handle: "@HEHXumike",
		href: "#",
		icon: "simple-icons:instagram",
	},
	{
		cn: "邮箱",
		en: "E-mail",
		handle: "hello@hehxumike.com",
		href: "mailto:hello@hehxumike.com",
		icon: "fa7-solid:envelope",
	},
];