const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../莫娜-Di_sgISM.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
