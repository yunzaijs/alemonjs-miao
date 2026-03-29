const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1009_basic_atk-D0nmKOt6.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
