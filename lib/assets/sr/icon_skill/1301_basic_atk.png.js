const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1301_basic_atk-C4otbZoJ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
