const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../81161-C_4HAyLv.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
