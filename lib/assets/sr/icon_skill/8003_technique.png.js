const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8003_technique-C7AVwtO6.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
