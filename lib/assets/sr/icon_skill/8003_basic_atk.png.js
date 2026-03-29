const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8003_basic_atk-Bwwp8Mbs.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
