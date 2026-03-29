const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8003_rank4-MK3r8sMR.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
