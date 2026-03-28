const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../爻光-BWbR1S-H.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
