const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1321_technique-D8oCgBbE.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
