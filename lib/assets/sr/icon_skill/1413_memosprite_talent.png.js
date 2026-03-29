const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1413_memosprite_talent-2eJ-uGWS.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
