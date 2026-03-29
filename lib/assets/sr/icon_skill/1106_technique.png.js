const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1106_technique-D2im8bEv.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
