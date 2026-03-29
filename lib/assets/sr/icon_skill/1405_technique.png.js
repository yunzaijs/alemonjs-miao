const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1405_technique-CP0Rzm-4.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
