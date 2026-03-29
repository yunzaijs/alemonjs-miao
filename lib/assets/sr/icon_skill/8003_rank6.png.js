const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8003_rank6-DMQI_lmg.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
