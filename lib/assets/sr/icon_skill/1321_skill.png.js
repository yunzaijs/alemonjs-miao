const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1321_skill-CNc06SNh.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
