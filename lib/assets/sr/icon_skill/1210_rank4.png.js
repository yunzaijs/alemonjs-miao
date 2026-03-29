const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1210_rank4-DVRhFBq2.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
