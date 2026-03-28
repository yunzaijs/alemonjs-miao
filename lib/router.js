import { miaoRouteRules } from './constants/mihoyo.js';
import { defineRouter, lazy } from 'alemonjs';

var router = defineRouter([
    {
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create'],
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
                regular: miaoRouteRules.rankList,
                handler: lazy(() => import('./response/miao/rankList.js'))
            },
            {
                regular: miaoRouteRules.groupTop,
                handler: lazy(() => import('./response/miao/groupTop.js'))
            },
            {
                regular: miaoRouteRules.rankAdmin,
                handler: lazy(() => import('./response/miao/rankAdmin.js'))
            },
            {
                regular: miaoRouteRules.roleCombat,
                handler: lazy(() => import('./response/miao/roleCombat.js'))
            },
            {
                regular: miaoRouteRules.hardChallenge,
                handler: lazy(() => import('./response/miao/hardChallenge.js'))
            },
            {
                regular: miaoRouteRules.profileList,
                handler: lazy(() => import('./response/miao/profileList.js'))
            },
            {
                regular: miaoRouteRules.profileDetail,
                handler: lazy(() => import('./response/miao/profileDetail.js'))
            },
            {
                regular: miaoRouteRules.artifactList,
                handler: lazy(() => import('./response/miao/artifactList.js'))
            },
            {
                regular: miaoRouteRules.trainingStat,
                handler: lazy(() => import('./response/miao/trainingStat.js'))
            }
        ]
    }
]);

export { router as default };
