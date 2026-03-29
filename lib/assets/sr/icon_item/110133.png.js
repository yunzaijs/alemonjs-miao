const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110133-vRd_D5eh.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
