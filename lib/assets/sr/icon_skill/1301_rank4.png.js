const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1301_rank4-Bn_Z2_D0.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
