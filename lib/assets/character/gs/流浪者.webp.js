const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../流浪者-CwCPu3ss.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
