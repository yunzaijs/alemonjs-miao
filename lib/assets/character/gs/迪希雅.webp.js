const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../迪希雅-CHATZix3.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
