const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../星·记忆-Dgfgb2iQ.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
