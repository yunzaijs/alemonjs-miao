const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../262-Co_kF0WK.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
