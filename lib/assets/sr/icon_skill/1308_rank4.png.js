const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1308_rank4-BLTDZf3I.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
