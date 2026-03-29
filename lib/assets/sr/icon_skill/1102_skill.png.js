const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1102_skill-Bs_qiW3U.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
