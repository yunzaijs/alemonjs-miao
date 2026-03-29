const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8001_basic_atk-DEaSp3VP.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
