const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../米沙-CBz16rPf.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
