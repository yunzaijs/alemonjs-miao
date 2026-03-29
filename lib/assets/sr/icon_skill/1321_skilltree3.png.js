const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1321_skilltree3-C1DXZ7ri.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
