const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1317_talent-BlN1m7Ek.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
