const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../卡维-C3nRB1wk.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
