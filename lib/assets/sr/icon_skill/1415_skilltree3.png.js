const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1415_skilltree3-CBP8Hnez.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
