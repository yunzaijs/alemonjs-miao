const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1002_rank2-uCe4dM6G.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
