const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1201_skilltree2-CRMqd_S5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
