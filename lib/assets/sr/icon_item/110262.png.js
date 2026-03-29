const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110262-Bc3CQgZQ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
