const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1413_skilltree1-DDppUMPr.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
