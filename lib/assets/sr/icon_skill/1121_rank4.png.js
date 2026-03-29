const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1121_rank4-d94QvOle.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
