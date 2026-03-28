const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../北斗-BdZKVBE9.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
