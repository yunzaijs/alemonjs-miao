const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1213_technique-BAxnp8dT.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
