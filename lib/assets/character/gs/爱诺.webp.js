const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../爱诺-Dq9QTUJ6.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
