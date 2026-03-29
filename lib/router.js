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
            },
            {
                regular: miaoRouteRules.charWiki,
                handler: lazy(() => import('./response/miao/charWiki.js'))
            },
            {
                regular: miaoRouteRules.strategy,
                handler: lazy(() => import('./response/miao/strategy.js'))
            },
            {
                regular: miaoRouteRules.banner,
                handler: lazy(() => import('./response/miao/banner.js'))
            },
            {
                regular: miaoRouteRules.gachaDetail,
                handler: lazy(() => import('./response/miao/gachaDetail.js'))
            },
            {
                regular: miaoRouteRules.gachaStat,
                handler: lazy(() => import('./response/miao/gachaStat.js'))
            },
            {
                regular: miaoRouteRules.abyss,
                handler: lazy(() => import('./response/miao/abyss.js'))
            },
            {
                regular: miaoRouteRules.abyssStat,
                handler: lazy(() => import('./response/miao/abyssStat.js'))
            },
            {
                regular: miaoRouteRules.abyssUsage,
                handler: lazy(() => import('./response/miao/abyssUsage.js'))
            },
            {
                regular: miaoRouteRules.todayMaterial,
                handler: lazy(() => import('./response/miao/todayMaterial.js'))
            },
            {
                regular: miaoRouteRules.avatarCard,
                handler: lazy(() => import('./response/miao/avatarCard.js'))
            },
            {
                regular: miaoRouteRules.avatarWife,
                handler: lazy(() => import('./response/miao/avatarWife.js'))
            },
            {
                regular: miaoRouteRules.profileImgManage,
                handler: lazy(() => import('./response/miao/profileImgManage.js'))
            },
            {
                regular: miaoRouteRules.weapon,
                handler: lazy(() => import('./response/miao/weapon.js'))
            },
            {
                regular: miaoRouteRules.weaponWiki,
                handler: lazy(() => import('./response/miao/weaponWiki.js'))
            },
            {
                regular: miaoRouteRules.charMaterial,
                handler: lazy(() => import('./response/miao/charMaterial.js'))
            },
            {
                regular: miaoRouteRules.charArtis,
                handler: lazy(() => import('./response/miao/charArtis.js'))
            },
            {
                regular: miaoRouteRules.roleCard,
                handler: lazy(() => import('./response/miao/roleCard.js'))
            },
            {
                regular: miaoRouteRules.gameCard,
                handler: lazy(() => import('./response/miao/showUid.js'))
            },
            {
                regular: miaoRouteRules.version,
                handler: lazy(() => import('./response/miao/version.js'))
            },
            {
                regular: miaoRouteRules.admin,
                handler: lazy(() => import('./response/miao/admin.js'))
            }
        ]
    },
    {
        selects: ['notice.create', 'private.notice.create'],
        handler: lazy(() => import('./response/miao/poke.js'))
    }
]);

export { router as default };
