const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../娜维娅-B_m2ACLK.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
