const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1103_skilltree1-CtjF33XJ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
