const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1312_rank2-CIi7rOSQ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
