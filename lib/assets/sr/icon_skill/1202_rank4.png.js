const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1202_rank4-DC0dKbfG.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
