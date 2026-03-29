const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1112_skill-B3n3VNst.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
