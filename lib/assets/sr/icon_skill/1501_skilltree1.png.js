const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1501_skilltree1-Azmk2ysF.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
