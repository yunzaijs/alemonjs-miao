const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../乱破-CSOTe_Fr.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
