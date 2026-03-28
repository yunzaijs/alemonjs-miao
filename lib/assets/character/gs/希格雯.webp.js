const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../希格雯-D0iSb6xE.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
