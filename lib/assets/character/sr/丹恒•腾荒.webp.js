const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../丹恒•腾荒-SsixKLoi.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
