const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1502_basic_atk-Dyzn8KXI.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
