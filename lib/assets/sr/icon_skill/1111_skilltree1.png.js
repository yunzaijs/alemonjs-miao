const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1111_skilltree1-DV3K_yms.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
