const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110183-Cu0WUaWh.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
