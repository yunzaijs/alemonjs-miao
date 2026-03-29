const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1120_rank6-DxdEc1gU.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
