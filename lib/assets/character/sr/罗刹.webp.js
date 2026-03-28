const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../罗刹-Dq_c_LIH.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
