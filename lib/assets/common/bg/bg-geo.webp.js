const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../bg-geo-DBwWud44.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
