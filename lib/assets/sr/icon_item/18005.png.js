const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../18005-CMu8PYOT.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
