const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1203_rank2-A5OmxrZ8.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
