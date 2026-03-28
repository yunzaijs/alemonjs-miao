const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../恰斯卡-XT1TdsIb.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
