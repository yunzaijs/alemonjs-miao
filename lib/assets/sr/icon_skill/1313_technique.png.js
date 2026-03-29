const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1313_technique-DzbOmX8j.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
