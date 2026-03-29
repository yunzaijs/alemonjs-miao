const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1102_skilltree1-VlrMjoQm.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
