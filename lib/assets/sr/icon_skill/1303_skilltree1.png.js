const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1303_skilltree1-DdRgPMTp.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
