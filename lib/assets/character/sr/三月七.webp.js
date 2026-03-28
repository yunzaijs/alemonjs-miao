const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../三月七-BBW_MKa9.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
