const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../231-BHt7idFK.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
