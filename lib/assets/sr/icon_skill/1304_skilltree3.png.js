const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1304_skilltree3-XDNvF0EE.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
