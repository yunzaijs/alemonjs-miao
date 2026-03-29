const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1414_skilltree3-D91KAW0g.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
