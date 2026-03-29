const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110436-D7Vk_SMr.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
