const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../113004-DSEasC7R.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
