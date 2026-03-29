const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1305_technique-dRD0CFQ5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
