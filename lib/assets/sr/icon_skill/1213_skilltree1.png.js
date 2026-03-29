const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1213_skilltree1-CdcW5Pso.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
