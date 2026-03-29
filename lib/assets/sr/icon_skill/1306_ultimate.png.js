const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1306_ultimate-DU6oP1u9.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
