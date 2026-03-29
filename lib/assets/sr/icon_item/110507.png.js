const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110507-CLNH2QQT.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
