const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../克洛琳德-Xsq9BW4Y.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
