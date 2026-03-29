const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8001_rank4-De2eY0fZ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
