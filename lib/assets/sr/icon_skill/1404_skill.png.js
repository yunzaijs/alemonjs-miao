const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1404_skill-BqV3Peiz.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
