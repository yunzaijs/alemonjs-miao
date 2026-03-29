const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1108_rank6-DS6M9MdD.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
