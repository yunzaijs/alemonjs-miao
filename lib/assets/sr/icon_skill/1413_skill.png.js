const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1413_skill-D1zjlKK_.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
