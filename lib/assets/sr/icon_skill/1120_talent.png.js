const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1120_talent-D4u-LrmM.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
