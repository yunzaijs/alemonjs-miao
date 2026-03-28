const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../蓝砚-Ckx3an7A.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
