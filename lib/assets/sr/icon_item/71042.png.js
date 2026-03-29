const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71042-VtWW0Esg.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
