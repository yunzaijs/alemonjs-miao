const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../桂乃芬-BHWAwghQ.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
