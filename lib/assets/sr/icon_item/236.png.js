const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../236-CgVTk02g.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
