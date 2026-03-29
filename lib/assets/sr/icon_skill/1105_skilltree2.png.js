const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1105_skilltree2-CmV-0jdP.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
