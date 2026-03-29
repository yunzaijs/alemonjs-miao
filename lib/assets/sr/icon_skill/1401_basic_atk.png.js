const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1401_basic_atk-DqQwfN2q.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
