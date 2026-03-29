const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1222_skill-CTq7v2e8.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
