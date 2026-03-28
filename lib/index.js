import router from './router.js';

var index = defineChildren({
    register() {
        return {
            responseRouter: router
        };
    },
    onCreated() {
        logger.info('Miao Plugin Server Done');
    }
});

export { index as default };
