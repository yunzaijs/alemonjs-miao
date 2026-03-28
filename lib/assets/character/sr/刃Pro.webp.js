const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../刃Pro-CwhYvVDz.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
