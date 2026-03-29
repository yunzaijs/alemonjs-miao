const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../111012-OxDb9U_q.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
