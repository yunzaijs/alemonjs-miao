const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1201_basic_atk-9C6f8yZz.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
