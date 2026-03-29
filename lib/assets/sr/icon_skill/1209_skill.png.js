const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1209_skill-VNG-XYMH.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
