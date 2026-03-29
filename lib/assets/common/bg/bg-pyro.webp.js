const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../bg-pyro-QedaN9H-.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
