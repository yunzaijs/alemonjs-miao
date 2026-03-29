const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../bg-cryo-Bi68B4Qj.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
