const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1225_skilltree1-IGsf9wRN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
