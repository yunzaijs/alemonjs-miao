const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1309_rank6-Dtx8aM2t.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
