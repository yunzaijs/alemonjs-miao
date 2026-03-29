const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1107_skill-DqXsr6fD.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
