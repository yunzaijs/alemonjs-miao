const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../昔涟-CS4IzCqA.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
