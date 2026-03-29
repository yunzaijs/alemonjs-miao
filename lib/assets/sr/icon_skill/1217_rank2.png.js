const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1217_rank2-PMyACF5H.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
