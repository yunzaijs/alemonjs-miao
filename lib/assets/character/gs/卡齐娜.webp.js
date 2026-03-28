const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../卡齐娜-Doow8N7C.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
