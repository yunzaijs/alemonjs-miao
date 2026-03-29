const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1401_rank4-DPpN1jAX.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
