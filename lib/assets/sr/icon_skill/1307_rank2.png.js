const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1307_rank2-ig5aZ-_9.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
