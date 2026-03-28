const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../星·毁灭-BGovOxzt.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
