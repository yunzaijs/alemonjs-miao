const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../夏洛蒂-Cg1fuBe8.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
