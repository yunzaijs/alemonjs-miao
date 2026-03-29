const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1220_skilltree1-DAtTjV0u.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
