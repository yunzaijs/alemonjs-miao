const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1105_basic_atk-CHNQj4ZY.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
