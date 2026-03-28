const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../真理医生-Ct7J2zaL.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
