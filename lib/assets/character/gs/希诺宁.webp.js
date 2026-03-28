const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../希诺宁-3tmudwxF.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
