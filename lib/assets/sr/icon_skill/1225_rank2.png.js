const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1225_rank2-BJStqu0G.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
