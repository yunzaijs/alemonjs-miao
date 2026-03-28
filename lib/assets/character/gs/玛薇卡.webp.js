const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../玛薇卡-5LsPxkoa.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
