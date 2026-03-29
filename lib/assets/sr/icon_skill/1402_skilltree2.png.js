const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1402_skilltree2-ChZ7zd7G.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
