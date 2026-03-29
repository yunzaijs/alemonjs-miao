const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1223_rank6-D8CgQgB0.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
