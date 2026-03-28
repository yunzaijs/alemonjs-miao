const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../波提欧-DpOOBhBD.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
