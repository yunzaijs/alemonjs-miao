const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1407_ultimate-CO95qrna.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
