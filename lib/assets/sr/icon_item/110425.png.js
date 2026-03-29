const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110425-CG12R2On.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
