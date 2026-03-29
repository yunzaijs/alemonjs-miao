const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1414_skilltree2-B7J7hxaX.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
