const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1308_rank2-BVfoBF3l.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
