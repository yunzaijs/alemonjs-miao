const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../欢愉-C2bcQnX_.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
