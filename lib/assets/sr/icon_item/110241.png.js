const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110241-DV7a4DIs.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
