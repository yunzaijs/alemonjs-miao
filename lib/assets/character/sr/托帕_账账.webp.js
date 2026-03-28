const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../托帕_账账-BZ4IvBR_.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
