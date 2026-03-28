const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../塔利雅-BXK8c0I_.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
