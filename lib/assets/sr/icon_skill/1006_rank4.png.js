const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1006_rank4-DHD3oiuN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
