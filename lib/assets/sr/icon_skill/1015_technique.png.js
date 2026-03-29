const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1015_technique-mVw-Xlk4.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
