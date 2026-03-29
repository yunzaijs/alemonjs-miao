const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1111_rank1-DNgVPq_U.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
