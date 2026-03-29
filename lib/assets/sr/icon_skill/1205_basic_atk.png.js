const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1205_basic_atk-CaR_gXok.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
