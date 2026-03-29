const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1212_skilltree3-BWqfAW_V.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
