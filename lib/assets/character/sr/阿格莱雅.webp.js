const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../阿格莱雅-IbpHP3Cs.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
