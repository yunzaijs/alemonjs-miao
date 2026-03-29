const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1130_rank4-OmFTDY0U.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
