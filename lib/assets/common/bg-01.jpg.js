const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../bg-01-Cb8y5rVe.jpg', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
