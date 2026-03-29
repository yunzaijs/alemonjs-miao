const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1404_rank6-Bq4G_4MK.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
