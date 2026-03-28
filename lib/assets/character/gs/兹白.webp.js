const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../兹白-Dt_L-wsL.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
