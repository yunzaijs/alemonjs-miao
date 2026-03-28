const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../班尼特-CtgRG1mG.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
