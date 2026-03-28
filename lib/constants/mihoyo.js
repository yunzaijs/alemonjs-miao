const miaoRouteRules = {
    help: /^(!|！|\/|#|＃)(喵喵|miao|miaomiao)(帮助|help|模块)$/,
    calendar: /^(!|！|\/|#|＃)(原神|星铁|绝区零)?(日历|素材日历|今日素材|明日素材)$/,
    profileList: /^(!|！|\/|#|＃)(原神|星铁)?(喵喵)?(面板|更新面板)(列表)?\s*(\d{9,10})?$/,
    profileDetail: /^(!|！|\/|#|＃)*(.{1,10})\s*(详细|面板|详情|面板详情|伤害)\s*(\d{9,10})?$/
};

export { miaoRouteRules };
