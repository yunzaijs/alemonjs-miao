const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110400-D7KTRL1F.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
