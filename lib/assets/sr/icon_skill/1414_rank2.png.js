const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1414_rank2-OkD8G7T0.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
