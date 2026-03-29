const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8001_skill-BlaerC4d.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
