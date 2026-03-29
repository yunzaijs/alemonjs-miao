const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1014_rank6-CI6nPjgd.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
