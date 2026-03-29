const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../21-B8uLx-Sq.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
