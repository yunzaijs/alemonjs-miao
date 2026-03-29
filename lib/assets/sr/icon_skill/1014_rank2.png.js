const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1014_rank2-DiDOr0SB.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
