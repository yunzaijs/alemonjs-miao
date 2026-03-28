const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../柯莱-Dpr-1h_j.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
