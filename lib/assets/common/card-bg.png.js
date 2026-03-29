const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../card-bg-BqEdr9HP.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
