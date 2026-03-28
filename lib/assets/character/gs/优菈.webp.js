const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../优菈-IlEjb4d_.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
