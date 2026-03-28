const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../荧-BwhM7oG3.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
