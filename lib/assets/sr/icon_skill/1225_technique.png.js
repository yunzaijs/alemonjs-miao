const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1225_technique-t73RHQ4H.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
