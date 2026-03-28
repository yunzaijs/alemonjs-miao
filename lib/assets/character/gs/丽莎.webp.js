const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../丽莎-A49a4W4q.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
