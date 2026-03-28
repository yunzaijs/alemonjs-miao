const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../雷电将军-BkBbTA43.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
