const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1307_ultimate1-aHGA2AZv.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
