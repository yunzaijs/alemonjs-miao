const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8007_technique-B2A9chNr.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
