const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1414_rank6-i6MdtoMQ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
