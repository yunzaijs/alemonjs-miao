const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1304_skilltree1-DDhlKa6g.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
