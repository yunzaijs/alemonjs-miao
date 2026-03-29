const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1210_skilltree1-DQ6ZCvne.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
