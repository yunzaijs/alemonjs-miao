const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8003_skilltree2-5jZXIK8c.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
