const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../41-B7zMIGDW.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
