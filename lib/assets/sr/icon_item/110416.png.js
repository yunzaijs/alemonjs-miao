const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110416-CJ_kDMCC.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
