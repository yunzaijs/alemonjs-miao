const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../奈芙尔-C6aMIher.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
