const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71044-aIz5M2Oa.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
