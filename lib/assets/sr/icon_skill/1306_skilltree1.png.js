const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1306_skilltree1-B8Dxonjw.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
