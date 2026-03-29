const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../800-Cwd4kgte.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
