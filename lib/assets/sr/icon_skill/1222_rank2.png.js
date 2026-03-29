const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1222_rank2-BwsxmH2c.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
