const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../bg-sr-DeBqk0uB.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
