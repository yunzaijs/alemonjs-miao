const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1201_skilltree1-BdGv3AH2.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
