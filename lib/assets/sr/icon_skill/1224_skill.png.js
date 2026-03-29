const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1224_skill-CeuGWTCq.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
