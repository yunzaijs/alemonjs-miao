const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../法尔伽-CmNv2q1R.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
