const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1402_servant1-clz7LJT4.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
