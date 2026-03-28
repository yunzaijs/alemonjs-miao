const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../迪卢克-D735EyxX.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
