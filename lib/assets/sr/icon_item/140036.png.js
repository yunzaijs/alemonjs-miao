const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../140036-BDnLBp2J.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
