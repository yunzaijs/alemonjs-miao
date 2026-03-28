const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../五郎-BE2wE3Xd.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
