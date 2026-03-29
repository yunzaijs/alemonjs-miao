const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1209_talent-BT6V4UE0.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
