const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../251-bnD7pRiU.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
