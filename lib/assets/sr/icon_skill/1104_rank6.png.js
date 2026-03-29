const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1104_rank6-Dj3aYF7p.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
