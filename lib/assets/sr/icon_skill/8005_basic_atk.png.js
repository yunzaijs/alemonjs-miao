const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8005_basic_atk-DLJDD-dM.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
