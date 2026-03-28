const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../镜流Pro-D60fH0Zq.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
