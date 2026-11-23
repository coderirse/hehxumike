import type { LicenseConfig } from "../types/licenseConfig";

// 画作版权归画家本人所有；页脚已声明，文章页不再重复显示许可证卡
export const licenseConfig: LicenseConfig = {
	enable: false,
	name: "All Rights Reserved",
	url: "",
	icon: "fa7-regular:copyright",
};