const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../彦卿-D1yus4vY.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
