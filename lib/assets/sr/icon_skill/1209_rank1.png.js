const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1209_rank1-D3x6Y1jO.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
