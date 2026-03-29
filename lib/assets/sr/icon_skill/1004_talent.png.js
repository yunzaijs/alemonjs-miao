const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1004_talent-Y6YwZO53.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
