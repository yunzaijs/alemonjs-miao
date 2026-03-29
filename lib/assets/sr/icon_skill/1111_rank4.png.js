const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1111_rank4-CX6JBweQ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
