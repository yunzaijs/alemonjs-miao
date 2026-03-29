const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1206_rank2-J_8_h3ks.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
