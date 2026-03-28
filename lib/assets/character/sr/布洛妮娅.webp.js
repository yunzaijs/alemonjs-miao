const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../布洛妮娅-CjpQ8nDC.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
