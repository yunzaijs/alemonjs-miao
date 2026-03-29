const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1304_technique-ADDa8Rjq.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
