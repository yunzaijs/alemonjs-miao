const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../100001-B8sEMa5r.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
