import { miaoRouteRules } from '@src/constants/mihoyo';
import { defineRouter, lazy } from 'alemonjs';

export default defineRouter([
  {
    // 局部中间件
    // 仅限消息和交互事件处理
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create'],
    handler: lazy(() => import('@src/response/mw')),
    children: [
      // ─── 帮助 ──────────────────────────────────────
      {
        regular: miaoRouteRules.help,
        handler: lazy(() => import('@src/response/miao/help'))
      },
      // ─── 日历 ──────────────────────────────────────
      {
        regular: miaoRouteRules.calendar,
        handler: lazy(() => import('@src/response/miao/calendar'))
      },
      // ─── 排行 ─────────────────────────────────────
      {
        regular: miaoRouteRules.rankList,
        handler: lazy(() => import('@src/response/miao/rankList'))
      },
      {
        regular: miaoRouteRules.groupTop,
        handler: lazy(() => import('@src/response/miao/groupTop'))
      },
      {
        regular: miaoRouteRules.rankAdmin,
        handler: lazy(() => import('@src/response/miao/rankAdmin'))
      },
      // ─── 幻想真境剧诗 & 幽境危战 ─────────────────
      {
        regular: miaoRouteRules.roleCombat,
        handler: lazy(() => import('@src/response/miao/roleCombat'))
      },
      {
        regular: miaoRouteRules.hardChallenge,
        handler: lazy(() => import('@src/response/miao/hardChallenge'))
      },
      // ─── 喵喵面板 ─────────────────────────────────
      {
        regular: miaoRouteRules.profileList,
        handler: lazy(() => import('@src/response/miao/profileList'))
      },
      {
        regular: miaoRouteRules.profileDetail,
        handler: lazy(() => import('@src/response/miao/profileDetail'))
      },
      // ─── 圣遗物列表 ───────────────────────────────
      {
        regular: miaoRouteRules.artifactList,
        handler: lazy(() => import('@src/response/miao/artifactList'))
      },
      // ─── 练度统计 ─────────────────────────────────
      {
        regular: miaoRouteRules.trainingStat,
        handler: lazy(() => import('@src/response/miao/trainingStat'))
      }
    ]
  }
]);
