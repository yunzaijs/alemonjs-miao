import { miaoRouteRules } from '@src/constants/mihoyo';
import { defineRouter, lazy } from 'alemonjs';

export default defineRouter([
  {
    // 局部中间件
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
      // ─── 喵喵面板 ─────────────────────────────────
      {
        regular: miaoRouteRules.profileList,
        handler: lazy(() => import('@src/response/miao/profileList'))
      },
      {
        regular: miaoRouteRules.profileDetail,
        handler: lazy(() => import('@src/response/miao/profileDetail'))
      }
    ]
  }
]);
