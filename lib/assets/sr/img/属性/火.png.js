const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../火-DPeHz-ac.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
