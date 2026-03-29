const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1201_skilltree3-CuUKH5OJ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
