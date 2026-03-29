const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1003_skilltree1-DgKWuX6L.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
