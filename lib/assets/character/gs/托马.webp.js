const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../托马-_1qviCfy.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
