const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1402_skill-C3mjg2uz.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
