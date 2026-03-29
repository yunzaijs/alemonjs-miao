const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1209_ultimate1-CENg0yw-.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
