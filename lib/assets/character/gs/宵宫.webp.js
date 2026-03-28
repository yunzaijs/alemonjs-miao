const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../宵宫-CY2Kzpa_.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
