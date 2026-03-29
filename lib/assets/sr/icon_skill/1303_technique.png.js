const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1303_technique-DGqN5g1L.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
