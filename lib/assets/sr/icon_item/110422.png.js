const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110422-Bsirvwu4.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
