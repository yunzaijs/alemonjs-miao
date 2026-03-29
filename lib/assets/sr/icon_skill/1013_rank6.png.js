const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1013_rank6-BZvDSur7.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
