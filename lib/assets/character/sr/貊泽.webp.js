const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../貊泽-DfbS_mwp.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
