const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1402_skilltree3-vLoSG1Ni.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
