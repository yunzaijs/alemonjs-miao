const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../椒丘-D00WvFbt.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
