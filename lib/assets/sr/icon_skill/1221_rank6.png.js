const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1221_rank6-BupCvmWh.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
