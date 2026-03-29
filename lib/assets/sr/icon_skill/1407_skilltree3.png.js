const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1407_skilltree3-Be-66b0E.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
