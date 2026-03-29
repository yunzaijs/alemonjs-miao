const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1223_skilltree1-CmehBGFV.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
