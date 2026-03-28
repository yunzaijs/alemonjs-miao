const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../刃-D48K7Evc.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
