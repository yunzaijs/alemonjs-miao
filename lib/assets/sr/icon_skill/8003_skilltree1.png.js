const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8003_skilltree1-BUVGIB37.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
