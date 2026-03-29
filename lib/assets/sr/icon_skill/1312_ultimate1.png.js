const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1312_ultimate1-DhUEY_mP.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
