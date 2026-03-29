const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1414_basic_atk-CMLg17In.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
