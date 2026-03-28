const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../刻律德菈-jqxqQlMv.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
