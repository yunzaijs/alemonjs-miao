const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8004_rank4-kzWzNgur.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
