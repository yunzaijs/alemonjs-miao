const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../量子-CUiNqy_M.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
