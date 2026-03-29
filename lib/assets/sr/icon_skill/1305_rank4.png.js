const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1305_rank4-B517yxIl.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
