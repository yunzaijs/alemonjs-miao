const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1202_skilltree3-Dk7frZHf.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
