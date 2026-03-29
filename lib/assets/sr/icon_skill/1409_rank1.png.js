const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1409_rank1-BIK0Zehs.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
