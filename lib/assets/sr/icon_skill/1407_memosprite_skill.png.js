const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1407_memosprite_skill-C7h14_2y.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
