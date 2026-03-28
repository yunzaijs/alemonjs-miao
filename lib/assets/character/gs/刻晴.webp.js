const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../刻晴-ENqX8awQ.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
