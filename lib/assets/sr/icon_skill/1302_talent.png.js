const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1302_talent-D4EA4vv8.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
