const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../爱可菲-Bg3Owzeu.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
