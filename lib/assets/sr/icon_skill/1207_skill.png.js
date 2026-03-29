const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1207_skill-D8WA5zXd.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
