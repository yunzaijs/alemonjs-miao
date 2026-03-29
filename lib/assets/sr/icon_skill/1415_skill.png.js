const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1415_skill-OinJhWNu.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
