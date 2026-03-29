const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1215_basic_atk-DtBJzxjq.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
