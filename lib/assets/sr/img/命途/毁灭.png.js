const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../毁灭-B7Lp2np_.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
