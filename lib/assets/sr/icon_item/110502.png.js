const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110502-DorR7k2S.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
