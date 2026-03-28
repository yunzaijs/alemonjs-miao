const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../卢卡-DVWgoteN.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
