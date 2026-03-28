const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../纳西妲-B3VXNb5p.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
