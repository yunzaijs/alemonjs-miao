const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../达达利亚-CjbrqaBq.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
