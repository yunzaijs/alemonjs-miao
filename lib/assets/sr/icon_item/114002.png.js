const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../114002-D6oDdzIA.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
