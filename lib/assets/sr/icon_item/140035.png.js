const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../140035-DL9b1u1c.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
