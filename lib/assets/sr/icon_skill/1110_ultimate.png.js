const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1110_ultimate-D4HsTXwM.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
