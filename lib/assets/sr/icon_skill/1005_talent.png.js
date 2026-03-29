const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1005_talent-Ceul9q-s.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
