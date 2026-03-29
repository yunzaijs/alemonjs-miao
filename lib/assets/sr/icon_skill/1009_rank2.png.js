const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1009_rank2-Cr5ly1ss.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
