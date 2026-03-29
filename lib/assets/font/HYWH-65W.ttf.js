const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../HYWH-65W-DSCAH0KV.ttf', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
