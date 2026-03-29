const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71025-D5zfDGna.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
