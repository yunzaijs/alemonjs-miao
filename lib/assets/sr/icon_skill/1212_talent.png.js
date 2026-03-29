const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1212_talent-BODYj04G.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
