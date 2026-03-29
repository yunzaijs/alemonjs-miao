const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../83091-Bbx5kdne.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
