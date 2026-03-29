const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71007-Dtv8ouhV.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
