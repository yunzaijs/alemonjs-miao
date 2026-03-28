const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../穹·毁灭-14-WmuH8.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
