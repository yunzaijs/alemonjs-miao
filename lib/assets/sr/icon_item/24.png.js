const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../24-C59WR11M.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
