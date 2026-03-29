const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8001_talent-CO8pm0Iq.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
