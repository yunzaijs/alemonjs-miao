const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1415_basic_atk-CvNfuN0L.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
