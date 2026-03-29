const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1321_rank2-D0A4DTu1.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
