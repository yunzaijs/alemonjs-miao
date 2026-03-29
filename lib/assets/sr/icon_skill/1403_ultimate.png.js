const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1403_ultimate-D70s9WP-.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
