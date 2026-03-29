const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1105_skill-Bf1OGeG2.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
