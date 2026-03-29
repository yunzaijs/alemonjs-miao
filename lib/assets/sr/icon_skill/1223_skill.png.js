const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1223_skill-CQ5jCCt2.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
