const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../温迪-fbiBz323.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
