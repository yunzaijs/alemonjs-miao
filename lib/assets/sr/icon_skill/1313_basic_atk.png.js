const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1313_basic_atk-B-NTvWLl.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
