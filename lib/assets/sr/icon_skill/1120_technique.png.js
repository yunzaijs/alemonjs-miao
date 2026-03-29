const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1120_technique-Dld9wfPM.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
