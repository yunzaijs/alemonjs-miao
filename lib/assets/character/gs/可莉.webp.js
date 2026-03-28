const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../可莉-By9RBoxG.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
