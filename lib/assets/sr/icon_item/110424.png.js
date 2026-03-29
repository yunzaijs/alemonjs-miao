const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110424-2vd7nX2t.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
