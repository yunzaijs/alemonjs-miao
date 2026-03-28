const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../三月七·巡猎-C8aedpNT.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
