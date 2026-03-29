const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8003_skilltree3-Dpl5SI4K.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
