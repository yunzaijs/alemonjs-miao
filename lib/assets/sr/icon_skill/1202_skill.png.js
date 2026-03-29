const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1202_skill-Dv11RfiX.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
