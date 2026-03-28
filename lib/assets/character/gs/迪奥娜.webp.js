const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../迪奥娜-muLM8RJz.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
