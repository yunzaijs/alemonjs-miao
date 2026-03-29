const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../111013-DAJji-2U.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
