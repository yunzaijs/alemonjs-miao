const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../白露-Egr8Kelk.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
