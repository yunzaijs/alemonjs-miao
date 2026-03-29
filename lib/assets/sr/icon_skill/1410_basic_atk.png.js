const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1410_basic_atk-Br1w4AJp.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
