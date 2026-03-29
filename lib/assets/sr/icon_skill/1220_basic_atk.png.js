const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1220_basic_atk-Bug0um5d.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
