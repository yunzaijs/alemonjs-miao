const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../101-DOa8vGnp.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
