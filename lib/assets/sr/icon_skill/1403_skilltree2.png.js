const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1403_skilltree2-CWS0f_yR.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
