const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1310_rank2-Dz-3hNUN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
