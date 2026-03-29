const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8007_rank6-BniHn3st.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
