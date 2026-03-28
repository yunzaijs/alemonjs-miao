const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../哥伦比娅-CML0pYac.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
