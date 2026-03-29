const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110132-Bg3Rt1Kg.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
