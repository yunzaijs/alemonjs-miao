const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8004_skilltree1-B_rEBvBi.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
