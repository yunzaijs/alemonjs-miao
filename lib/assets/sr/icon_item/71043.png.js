const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71043-D2Iiu5UE.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
