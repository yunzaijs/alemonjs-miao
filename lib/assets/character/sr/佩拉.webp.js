const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../佩拉-Mk3L8v8m.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
