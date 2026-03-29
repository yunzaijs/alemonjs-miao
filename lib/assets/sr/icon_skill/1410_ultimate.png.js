const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1410_ultimate-DWh5_zqd.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
