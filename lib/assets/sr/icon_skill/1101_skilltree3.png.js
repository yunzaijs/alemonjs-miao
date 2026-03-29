const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1101_skilltree3-Ba5fcTc5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
