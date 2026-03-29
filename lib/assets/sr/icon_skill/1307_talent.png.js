const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1307_talent-Da3Iqo72.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
