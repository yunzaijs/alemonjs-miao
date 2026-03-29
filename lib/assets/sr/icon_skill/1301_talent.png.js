const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1301_talent-BXEMVR3x.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
