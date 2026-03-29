const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1321_skilltree2-C93rO2Ll.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
