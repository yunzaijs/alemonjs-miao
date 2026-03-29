const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../201-UYF21Iba.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
