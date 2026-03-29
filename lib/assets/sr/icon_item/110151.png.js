const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110151-Can17K0i.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
