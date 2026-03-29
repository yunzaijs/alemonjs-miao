const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1303_rank6-BRTEQDf9.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
