const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110414-eU4LftNB.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
