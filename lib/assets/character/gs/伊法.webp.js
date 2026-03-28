const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../伊法-Rb91XIZ_.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
