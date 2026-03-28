const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../穹·存护-B2kyySgq.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
