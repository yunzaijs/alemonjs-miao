const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1013_rank2-CfOMXKgF.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
