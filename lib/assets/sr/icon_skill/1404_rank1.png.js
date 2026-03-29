const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1404_rank1-B1c45JTK.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
