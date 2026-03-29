const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1409_rank4-DOn_vvEW.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
