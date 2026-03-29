const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1412_rank6-CHA4pOqV.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
