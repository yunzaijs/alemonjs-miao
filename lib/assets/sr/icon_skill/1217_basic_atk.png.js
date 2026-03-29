const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1217_basic_atk-D4487Z_N.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
