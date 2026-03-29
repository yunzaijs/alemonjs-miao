const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../112002-CnFTI_wv.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
