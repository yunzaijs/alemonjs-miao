const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110505-Cetk6Ekc.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
