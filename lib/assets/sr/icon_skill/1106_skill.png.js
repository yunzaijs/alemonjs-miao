const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1106_skill-DXn1fKGl.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
