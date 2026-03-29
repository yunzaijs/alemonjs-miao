const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1301_skilltree2-KI_vfBrO.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
