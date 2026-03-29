const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1014_rank4-BepIYyfJ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
