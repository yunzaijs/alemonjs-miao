const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1006_basic_atk-CcMqR49T.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
