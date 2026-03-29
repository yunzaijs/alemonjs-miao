const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71008-DFXaS-11.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
