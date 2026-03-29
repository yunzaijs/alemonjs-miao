const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1109_rank4-BHp0-oLu.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
