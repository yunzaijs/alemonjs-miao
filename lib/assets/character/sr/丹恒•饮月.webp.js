const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../丹恒•饮月-EOWnJS6T.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
