const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1005_ultimate1-CeRixaOR.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
