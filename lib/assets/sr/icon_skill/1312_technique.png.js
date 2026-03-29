const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1312_technique-BcM1efZ5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
