const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110253-Do_G3Tqx.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
