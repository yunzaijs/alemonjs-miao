const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71014-Hbdke70_.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
