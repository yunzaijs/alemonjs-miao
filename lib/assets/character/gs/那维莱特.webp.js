const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../那维莱特-B-YjvZaY.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
