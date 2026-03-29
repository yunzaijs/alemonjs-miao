const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../巡猎-DZyfjimg.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
