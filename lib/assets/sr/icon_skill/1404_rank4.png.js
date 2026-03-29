const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1404_rank4-D6KZvU18.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
