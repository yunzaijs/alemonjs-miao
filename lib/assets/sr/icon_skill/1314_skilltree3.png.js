const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1314_skilltree3-BhQPNg0R.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
