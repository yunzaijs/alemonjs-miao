const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110121-C3olYd0y.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
