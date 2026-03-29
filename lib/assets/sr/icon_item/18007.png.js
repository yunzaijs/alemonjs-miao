const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../18007-1g0NfQ7m.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
