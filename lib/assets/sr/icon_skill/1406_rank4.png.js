const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1406_rank4-DHBw9jQO.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
