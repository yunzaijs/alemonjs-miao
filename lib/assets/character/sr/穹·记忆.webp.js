const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../穹·记忆-DV9O2EkK.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
