import { miaoRouteRules } from './constants/mihoyo.js';
import { defineRouter, lazy } from 'alemonjs';

var router = defineRouter([
    {
        handler: lazy(() => import('./response/mw.js')),
        children: [
            {
                regular: miaoRouteRules.help,
                handler: lazy(() => import('./response/miao/help.js'))
            },
            {
                regular: miaoRouteRules.calendar,
                handler: lazy(() => import('./response/miao/calendar.js'))
            },
            {
                regular: miaoRouteRules.profileList,
                handler: lazy(() => import('./response/miao/profileList.js'))
            },
            {
                regular: miaoRouteRules.profileDetail,
                handler: lazy(() => import('./response/miao/profileDetail.js'))
            }
        ]
    }
]);

export { router as default };
