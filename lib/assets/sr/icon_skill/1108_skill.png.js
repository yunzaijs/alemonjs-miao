const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1108_skill-BTC7hS_L.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
