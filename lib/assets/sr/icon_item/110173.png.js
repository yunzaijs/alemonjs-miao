const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110173-Dw46IB6T.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
