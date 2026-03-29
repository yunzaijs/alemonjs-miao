const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1005_skilltree2-CijOZ7Mh.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
