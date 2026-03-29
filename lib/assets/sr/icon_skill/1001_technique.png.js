const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1001_technique-CwIMW6VA.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
