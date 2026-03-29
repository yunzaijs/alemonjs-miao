const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../113013-DCmPKlMQ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
