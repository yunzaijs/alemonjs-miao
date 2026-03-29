const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1408_technique-BYjky6OW.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
