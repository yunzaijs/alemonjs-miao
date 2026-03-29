const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110412-9zq1dHyD.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
