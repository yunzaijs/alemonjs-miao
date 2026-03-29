const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1223_skilltree2-DezDL1Bi.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
