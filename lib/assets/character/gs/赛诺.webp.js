const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../赛诺-B7bx0wPI.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
