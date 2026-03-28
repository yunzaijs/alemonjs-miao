const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../梦见月瑞希-CkTkwSE6.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
