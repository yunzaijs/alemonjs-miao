const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../久岐忍-DAhsc0Dx.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
