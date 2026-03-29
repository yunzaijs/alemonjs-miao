const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1304_rank2-CgpzyGvO.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
