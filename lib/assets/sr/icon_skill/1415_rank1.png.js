const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1415_rank1-Dxpf3Z9h.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
