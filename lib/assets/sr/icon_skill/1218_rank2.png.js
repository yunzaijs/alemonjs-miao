const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1218_rank2-BjWW1Qjy.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
