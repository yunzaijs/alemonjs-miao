const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8002_skill-C8p12X85.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
