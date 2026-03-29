const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1206_technique-D2pJIYng.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
