const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1204_ultimate-DL6sSJWn.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
