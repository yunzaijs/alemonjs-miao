const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../伊安珊-BwLq7-jK.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
