const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1013_skilltree1-Cwt8q1Yk.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
