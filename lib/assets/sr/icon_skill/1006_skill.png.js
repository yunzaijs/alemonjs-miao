const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1006_skill-UCkN2DuN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
