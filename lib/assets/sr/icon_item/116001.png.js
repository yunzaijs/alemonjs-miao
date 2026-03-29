const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../116001-DDdjL1Gq.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
