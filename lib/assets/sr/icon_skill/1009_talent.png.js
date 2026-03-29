const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1009_talent-llb1PH9c.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
