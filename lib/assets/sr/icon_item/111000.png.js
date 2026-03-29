const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../111000-Bd4oWfu1.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
