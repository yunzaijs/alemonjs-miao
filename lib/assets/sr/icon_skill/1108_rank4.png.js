const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1108_rank4-OhAEmQTN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
