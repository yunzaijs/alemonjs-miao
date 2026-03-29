const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1225_rank6-CUjY1u7B.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
