const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../112011-DHuI1MUT.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
