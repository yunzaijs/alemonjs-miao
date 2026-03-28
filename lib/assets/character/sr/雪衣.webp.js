const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../雪衣-Do0Yt_TN.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
