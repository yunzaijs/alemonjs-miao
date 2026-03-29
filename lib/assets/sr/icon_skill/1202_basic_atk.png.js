const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1202_basic_atk-BvD6pifg.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
