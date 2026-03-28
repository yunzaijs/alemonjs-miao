const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../大黑塔-Dt21YB1D.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
