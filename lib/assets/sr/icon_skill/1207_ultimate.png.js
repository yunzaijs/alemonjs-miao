const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1207_ultimate-Dqjzn5K7.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
