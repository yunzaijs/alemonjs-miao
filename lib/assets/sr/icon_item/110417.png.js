const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110417-FE6KEhFB.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
