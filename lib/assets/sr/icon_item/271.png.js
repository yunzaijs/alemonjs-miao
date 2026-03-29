const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../271-OB64E1kN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
