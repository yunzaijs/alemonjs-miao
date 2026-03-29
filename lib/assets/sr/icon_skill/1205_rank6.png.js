const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1205_rank6-D3_3fIFI.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
