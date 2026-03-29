const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8005_rank6-DL0mFTht.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
