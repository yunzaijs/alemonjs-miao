const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1102_rank6-vVecypj4.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
