const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1412_skilltree2-BJuMjcES.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
