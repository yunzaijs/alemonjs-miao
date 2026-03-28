const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../克拉拉-B4j8rIXP.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
