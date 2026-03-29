const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1502_technique-G5JMWbnp.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
