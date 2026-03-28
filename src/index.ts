import router from './router';

// ─── 模块注册 ────────────────────────────────────────

export default defineChildren({
  register() {
    return {
      responseRouter: router
    };
  },
  onCreated() {
    logger.info('Miao Plugin Server Done');
  }
});
