const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1415_memosprite_talent-D7Kz8S41.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
