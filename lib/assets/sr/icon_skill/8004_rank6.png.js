const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8004_rank6-C3j7xG-k.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
