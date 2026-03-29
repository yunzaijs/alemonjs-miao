const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1013_skilltree3-DutrxdYq.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
