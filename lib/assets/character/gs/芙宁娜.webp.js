const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../芙宁娜-DlTsyqlk.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
