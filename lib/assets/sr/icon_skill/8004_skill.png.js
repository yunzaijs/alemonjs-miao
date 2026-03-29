const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8004_skill-6axV63vp.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
