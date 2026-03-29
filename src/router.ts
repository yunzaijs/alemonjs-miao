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
      },
      // ─── 角色资料/图鉴 ────────────────────────────
      {
        regular: miaoRouteRules.charWiki,
        handler: lazy(() => import('@src/response/miao/charWiki'))
      },
      // ─── 角色攻略 ─────────────────────────────────
      {
        regular: miaoRouteRules.strategy,
        handler: lazy(() => import('@src/response/miao/strategy'))
      },
      // ─── 复刻卡池统计 ─────────────────────────────
      {
        regular: miaoRouteRules.banner,
        handler: lazy(() => import('@src/response/miao/banner'))
      },
      // ─── 抽卡记录/分析 ────────────────────────────
      {
        regular: miaoRouteRules.gachaDetail,
        handler: lazy(() => import('@src/response/miao/gachaDetail'))
      },
      // ─── 抽卡统计 ─────────────────────────────────
      {
        regular: miaoRouteRules.gachaStat,
        handler: lazy(() => import('@src/response/miao/gachaStat'))
      },
      // ─── 深渊数据 ─────────────────────────────────
      {
        regular: miaoRouteRules.abyss,
        handler: lazy(() => import('@src/response/miao/abyss'))
      },
      // ─── 角色持有率/命座分布 ──────────────────────
      {
        regular: miaoRouteRules.abyssStat,
        handler: lazy(() => import('@src/response/miao/abyssStat'))
      },
      // ─── 深渊出场率/使用率 ────────────────────────
      {
        regular: miaoRouteRules.abyssUsage,
        handler: lazy(() => import('@src/response/miao/abyssUsage'))
      },
      // ─── 今日素材 ─────────────────────────────────
      {
        regular: miaoRouteRules.todayMaterial,
        handler: lazy(() => import('@src/response/miao/todayMaterial'))
      },
      // ─── 角色卡片 ─────────────────────────────────
      {
        regular: miaoRouteRules.avatarCard,
        handler: lazy(() => import('@src/response/miao/avatarCard'))
      },
      // ─── 老婆/老公系统 ────────────────────────────
      {
        regular: miaoRouteRules.avatarWife,
        handler: lazy(() => import('@src/response/miao/avatarWife'))
      },
      // ─── 面板图管理 ───────────────────────────────
      {
        regular: miaoRouteRules.profileImgManage,
        handler: lazy(() => import('@src/response/miao/profileImgManage'))
      },
      // ─── 管理员设置 ───────────────────────────────
      {
        regular: miaoRouteRules.admin,
        handler: lazy(() => import('@src/response/miao/admin'))
      }
    ]
  },
  // ─── 戳一戳 (notice 事件) ─────────────────────────
  {
    selects: ['notice.create', 'private.notice.create'],
    handler: lazy(() => import('@src/response/miao/poke'))
  }
]);
