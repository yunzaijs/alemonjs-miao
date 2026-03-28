const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../知更鸟-D8ha36rj.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
