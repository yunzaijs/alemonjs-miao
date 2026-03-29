const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1215_ultimate1-D4QX3ZU8.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
