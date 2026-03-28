const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../银枝-VJny6XYr.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
