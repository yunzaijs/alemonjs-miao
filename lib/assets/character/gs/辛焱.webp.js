const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../辛焱-DVOOY0F6.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
