const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1409_skill-D1OuzHKV.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
