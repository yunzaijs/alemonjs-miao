const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110503-DeB66gBV.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
