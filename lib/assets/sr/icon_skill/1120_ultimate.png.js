const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1120_ultimate-BHrpR6aT.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
