const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110421-B49Cq9Bo.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
