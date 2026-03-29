const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1224_skilltree1-DCmy9lrB.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
