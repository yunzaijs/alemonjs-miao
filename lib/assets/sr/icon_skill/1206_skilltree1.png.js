const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1206_skilltree1-CdLh9yMC.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
