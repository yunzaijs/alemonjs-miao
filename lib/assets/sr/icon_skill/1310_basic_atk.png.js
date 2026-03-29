const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1310_basic_atk-BB2lKFcW.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
