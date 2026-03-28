const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../九条裟罗-BWX3PyYp.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
