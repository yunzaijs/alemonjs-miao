const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1415_memosprite_skill-Buwmxx5-.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
