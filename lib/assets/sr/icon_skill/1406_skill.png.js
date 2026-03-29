const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1406_skill-CLP6zJ8k.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
