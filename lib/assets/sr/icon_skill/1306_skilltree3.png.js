const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1306_skilltree3-Bw5HR7xB.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
