import AbyssCard from '@src/img/views/AbyssCard';
import AbyssStatCard from '@src/img/views/AbyssStatCard';
import AbyssUsageCard from '@src/img/views/AbyssUsageCard';
import AdminSettingsCard from '@src/img/views/AdminSettingsCard';
import ArtifactListCard from '@src/img/views/ArtifactListCard';
import AvatarCard from '@src/img/views/AvatarCard';
import BannerCard from '@src/img/views/BannerCard';
import CalendarCard from '@src/img/views/CalendarCard';
import CharMaterialCard from '@src/img/views/CharMaterialCard';
import CharWikiCard from '@src/img/views/CharWikiCard';
import GachaDetailCard from '@src/img/views/GachaDetailCard';
import GachaStatCard from '@src/img/views/GachaStatCard';
import GroupTopCard from '@src/img/views/GroupTopCard';
import HardChallengeCard from '@src/img/views/HardChallengeCard';
import MaterialCard from '@src/img/views/MaterialCard';
import MiaoHelp from '@src/img/views/MiaoHelp';
import ProfileDetailCard from '@src/img/views/ProfileDetailCard';
import ProfileListCard from '@src/img/views/ProfileListCard';
import RankListCard from '@src/img/views/RankListCard';
import RoleCombatCard from '@src/img/views/RoleCombatCard';
import TrainingStatCard from '@src/img/views/TrainingStatCard';
import UidCard from '@src/img/views/UidCard';
import VersionCard from '@src/img/views/VersionCard';
import WeaponCard from '@src/img/views/WeaponCard';
import WeaponWikiCard from '@src/img/views/WeaponWikiCard';
import { defineConfig } from 'jsxp';
import React from 'react';

export default defineConfig({
  routes: {
    '/miao-help': {
      component: <MiaoHelp />
    },
    '/calendar': {
      component: (
        <CalendarCard
          data={{
            game: 'gs',
            gameName: '原神',
            rows: [
              [
                {
                  id: 1,
                  title: '「杯装之诗」祈愿 · 角色活动祈愿',
                  type: 'character',
                  banner: '',
                  icon: '',
                  startTime: '2025-01-01 10:00',
                  endTime: '2025-01-21 17:59',
                  isActive: true,
                  remaining: '剩余 10天',
                  left: 10,
                  width: 45,
                  label: '01-21 17:59 (10天后结束)',
                  sort: 1
                }
              ],
              [
                {
                  id: 2,
                  title: '「神铸赋形」祈愿 · 武器活动祈愿',
                  type: 'weapon',
                  banner: '',
                  icon: '',
                  startTime: '2025-01-01 10:00',
                  endTime: '2025-01-21 17:59',
                  isActive: true,
                  remaining: '剩余 10天',
                  left: 10,
                  width: 45,
                  label: '01-21 17:59 (10天后结束)',
                  sort: 3
                }
              ],
              [
                {
                  id: 3,
                  title: '「迷城战线」限时活动',
                  type: 'activity',
                  banner: '',
                  icon: '',
                  startTime: '2025-01-05 10:00',
                  endTime: '2025-01-15 03:59',
                  isActive: true,
                  remaining: '剩余 5天',
                  left: 20,
                  width: 30,
                  label: '01-15 03:59 (5天后结束)',
                  sort: 5
                },
                {
                  id: 4,
                  title: '「星辰归位」活动',
                  type: 'activity',
                  banner: '',
                  icon: '',
                  startTime: '2025-01-16 10:00',
                  endTime: '2025-01-25 03:59',
                  isActive: false,
                  remaining: '6天后开始',
                  left: 55,
                  width: 25,
                  label: '01-16 10:00 (6天后开始)',
                  sort: 5
                }
              ]
            ],
            abyssRows: [
              {
                id: 0,
                title: '「深境螺旋」· 1月',
                type: 'abyss',
                banner: '',
                icon: '',
                startTime: '2025-01-01 04:00',
                endTime: '2025-01-16 03:59',
                isActive: true,
                remaining: '剩余 6天',
                left: 5,
                width: 40,
                label: '01-16 03:59 (6天后结束)',
                sort: 0
              }
            ],
            dateList: [
              {
                month: 1,
                dates: [
                  { day: 3, weekday: '五' },
                  { day: 4, weekday: '六' },
                  { day: 5, weekday: '日' },
                  { day: 6, weekday: '一' },
                  { day: 7, weekday: '二' },
                  { day: 8, weekday: '三' },
                  { day: 9, weekday: '四' },
                  { day: 10, weekday: '五' },
                  { day: 11, weekday: '六' },
                  { day: 12, weekday: '日' },
                  { day: 13, weekday: '一' },
                  { day: 14, weekday: '二' },
                  { day: 15, weekday: '三' }
                ]
              }
            ],
            nowDate: 10,
            nowLeft: 55,
            nowTime: '2025-01-10 14:30',
            now: '2025/1/10 14:30:00'
          }}
        />
      )
    },
    '/profile-list': {
      component: (
        <ProfileListCard
          data={{
            game: 'gs',
            uid: '100000001',
            nickname: '旅行者',
            level: 60,
            signature: '预览数据',
            updateTime: new Date().toLocaleString('zh-CN'),
            avatars: [
              {
                id: 10000002,
                name: '神里绫华',
                abbr: '绫华',
                element: '冰',
                level: 90,
                cons: 6,
                fetter: 10,
                rarity: 5,
                icon: '',
                sideIcon: '',
                weapon: { name: '雾切之回光', icon: '', level: 90, rarity: 5, affix: 1 }
              },
              {
                id: 10000046,
                name: '胡桃',
                abbr: '胡桃',
                element: '火',
                level: 90,
                cons: 1,
                fetter: 10,
                rarity: 5,
                icon: '',
                sideIcon: '',
                weapon: { name: '护摩之杖', icon: '', level: 90, rarity: 5, affix: 1 }
              },
              {
                id: 10000031,
                name: '菲谢尔',
                abbr: '皇女',
                element: '雷',
                level: 80,
                cons: 4,
                fetter: 10,
                rarity: 4,
                icon: '',
                sideIcon: ''
              }
            ]
          }}
        />
      )
    },
    '/profile-detail': {
      component: (
        <ProfileDetailCard
          data={{
            game: 'gs',
            uid: '100000001',
            avatar: {
              id: 10000002,
              name: '神里绫华',
              abbr: '绫华',
              element: '冰',
              level: 90,
              cons: 6,
              fetter: 10,
              rarity: 5,
              icon: '',
              sideIcon: '',
              weapon: { name: '雾切之回光', level: 90, icon: '', rarity: 5, affix: 1 },
              talent: { a: 10, e: 10, q: 10 },
              stats: [
                { name: '生命值上限', key: 'maxHp', value: '29345', base: '15552', plus: '13793' },
                { name: '攻击力', key: 'atk', value: '1985', base: '820', plus: '1165' },
                { name: '防御力', key: 'def', value: '915', base: '762', plus: '153' },
                { name: '元素精通', key: 'em', value: '42' },
                { name: '暴击率', key: 'critRate', value: '69.8%' },
                { name: '暴击伤害', key: 'critDmg', value: '252.4%' },
                { name: '元素充能效率', key: 'er', value: '120.0%' },
                { name: '冰元素伤害加成', key: 'cryoDmg', value: '61.6%' }
              ],
              artifacts: [
                {
                  pos: 1,
                  name: '追忆之注连',
                  setName: '追忆之注连',
                  icon: '',
                  rarity: 5,
                  level: 20,
                  mainKey: 'FIGHT_PROP_HP',
                  mainName: '生命值',
                  mainValue: '4780',
                  subStats: [
                    { key: 'critRate', name: '暴击率', value: '14.0%' },
                    { key: 'critDmg', name: '暴击伤害', value: '21.8%' },
                    { key: 'atk', name: '攻击力', value: '14.6%' },
                    { key: 'er', name: '元素充能', value: '5.8%' }
                  ]
                }
              ]
            }
          }}
        />
      )
    },
    '/abyss': {
      component: (
        <AbyssCard
          data={{
            uid: '100000001',
            game: 'gs',
            schedule_id: 1,
            start_time: '2026-03-01',
            end_time: '2026-03-15',
            total_battle_times: 24,
            total_win_times: 24,
            max_floor: '12-3',
            total_star: 36,
            is_unlock: true,
            reveal_rank: [{ id: 10000002, icon: '', rarity: 5, level: 90, value: 32 }],
            damage_rank: [{ id: 10000046, icon: '', rarity: 5, level: 90, value: 286745 }],
            take_damage_rank: [{ id: 10000030, icon: '', rarity: 5, level: 90, value: 18204 }],
            defeat_rank: [{ id: 10000002, icon: '', rarity: 5, level: 90, value: 120 }],
            energy_skill_rank: [{ id: 10000031, icon: '', rarity: 4, level: 80, value: 45 }],
            normal_skill_rank: [{ id: 10000046, icon: '', rarity: 5, level: 90, value: 88 }],
            floors: [],
            period: '本期'
          }}
        />
      )
    },
    '/abyss-stat': {
      component: (
        <AbyssStatCard
          data={{
            title: '角色持有率',
            version: '5.4',
            update: '2026-03-15',
            list: [
              { name: '纳西妲', element: '草', rarity: 5, holdRate: 72.5, avgCons: 0.8, cons: [45, 20, 10, 8, 7, 5, 5] },
              { name: '行秋', element: '水', rarity: 4, holdRate: 90.2, avgCons: 5.1, cons: [5, 3, 2, 5, 5, 10, 70] }
            ]
          }}
        />
      )
    },
    '/abyss-usage': {
      component: (
        <AbyssUsageCard
          data={{
            title: '深渊使用率',
            version: '5.4',
            update: '2026-03-15',
            list: [
              { name: '纳西妲', element: '草', rarity: 5, useRate: 85.3, rankClass: 's1' },
              { name: '芙宁娜', element: '水', rarity: 5, useRate: 78.1, rankClass: 's' },
              { name: '钟离', element: '岩', rarity: 5, useRate: 45.2, rankClass: 'a' }
            ]
          }}
        />
      )
    },
    '/admin-settings': {
      component: <AdminSettingsCard data={{ type: '' }} />
    },
    '/artifact-list': {
      component: (
        <ArtifactListCard
          data={{
            game: 'gs',
            uid: '100000001',
            avatars: [
              {
                id: 10000002,
                name: '神里绫华',
                abbr: '绫华',
                element: '冰',
                rarity: 5,
                level: 90,
                cons: 6,
                fetter: 10,
                icon: '',
                sideIcon: '',
                weapon: { name: '雾切之回光', icon: '', level: 90, rarity: 5, affix: 1 },
                artifacts: [
                  {
                    pos: 1,
                    name: '追忆之注连',
                    setName: '追忆之注连',
                    icon: '',
                    rarity: 5,
                    level: 20,
                    mainKey: 'FIGHT_PROP_HP',
                    mainName: '生命值',
                    mainValue: '4780',
                    subStats: [
                      { key: 'critRate', name: '暴击率', value: '14.0%' },
                      { key: 'critDmg', name: '暴击伤害', value: '21.8%' }
                    ]
                  }
                ]
              }
            ]
          }}
        />
      )
    },
    '/avatar-card': {
      component: (
        <AvatarCard
          data={{
            uid: '100000001',
            game: 'gs',
            title: '角色卡片',
            avatars: [
              {
                id: 10000002,
                name: '神里绫华',
                element: '冰',
                fetter: 10,
                level: 90,
                rarity: 5,
                actived_constellation_num: 6,
                weapon: { id: 11505, name: '雾切之回光', type: 1, rarity: 5, level: 90, affix_level: 1, icon: '' },
                icon: '',
                image: ''
              }
            ]
          }}
        />
      )
    },
    '/banner': {
      component: (
        <BannerCard
          data={{
            mode: 'single',
            charName: '胡桃',
            element: '火',
            rarity: 5,
            records: [
              { version: '4.3', phase: 2, daysSince: 180 },
              { version: '3.4', phase: 1, daysSince: 540 }
            ]
          }}
        />
      )
    },
    '/char-material': {
      component: (
        <CharMaterialCard
          data={{
            name: '神里绫华',
            abbr: '绫华',
            element: '冰',
            rarity: 5,
            weaponType: '单手剑'
          }}
        />
      )
    },
    '/char-wiki': {
      component: (
        <CharWikiCard
          data={{
            name: '神里绫华',
            abbr: '绫华',
            element: '冰',
            rarity: 5,
            weaponType: '单手剑',
            mode: 'wiki'
          }}
        />
      )
    },
    '/gacha-detail': {
      component: (
        <GachaDetailCard
          data={{
            uid: '100000001',
            game: 'gs',
            analysis: {
              gachaType: 301,
              gachaTypeName: '角色活动祈愿',
              totalCount: 320,
              fiveStarCount: 4,
              fourStarCount: 32,
              threeStarCount: 284,
              pityCount: 45,
              fiveStarAvg: 72.5,
              fiveStarList: [
                { name: '纳西妲', count: 78, time: '2026-03-10', rarity: 5 },
                { name: '芙宁娜', count: 65, time: '2026-02-01', rarity: 5 }
              ]
            }
          }}
        />
      )
    },
    '/gacha-stat': {
      component: (
        <GachaStatCard
          data={{
            uid: '100000001',
            game: 'gs',
            analyses: [
              {
                gachaType: 301,
                gachaTypeName: '角色活动祈愿',
                totalCount: 320,
                fiveStarCount: 4,
                fourStarCount: 32,
                threeStarCount: 284,
                pityCount: 45,
                fiveStarAvg: 72.5,
                fiveStarList: []
              }
            ],
            totalCount: 500,
            totalFive: 6,
            totalFour: 50
          }}
        />
      )
    },
    '/group-top': {
      component: (
        <GroupTopCard
          data={{
            game: 'gs',
            uid: '100000001',
            avatar: {
              id: 10000002,
              name: '神里绫华',
              abbr: '绫华',
              element: '冰',
              rarity: 5,
              level: 90,
              cons: 6,
              fetter: 10,
              icon: '',
              sideIcon: '',
              weapon: { name: '雾切之回光', icon: '', level: 90, rarity: 5, affix: 1 }
            },
            rank: 1,
            type: 'mark'
          }}
        />
      )
    },
    '/hard-challenge': {
      component: (
        <HardChallengeCard
          data={{
            uid: '100000001',
            has_data: true,
            best: { difficulty: 4, second: 180, has_data: true },
            challs: [
              {
                name: '幽境危战 第一关',
                monster: { level: 100, icon: '', desc: ['遗迹守卫'] },
                second: 60,
                avatars: [
                  { avatar_id: 10000002, name: '神里绫华', level: 90, rarity: 5, rank: 6 },
                  { avatar_id: 10000046, name: '胡桃', level: 90, rarity: 5, rank: 1 }
                ],
                best_avatars: [{ avatar_id: 10000002, dps: 286745 }]
              }
            ],
            schedule: { start_time: '2026-03-01', end_time: '2026-03-15' }
          }}
        />
      )
    },
    '/material': {
      component: <MaterialCard data={{ game: 'gs', weekday: 1, dayLabel: '周一' }} />
    },
    '/rank-list': {
      component: (
        <RankListCard
          data={{
            game: 'gs',
            charName: '神里绫华',
            charElement: '冰',
            type: 'mark',
            entries: [
              { uid: '100000001', score: 252.4, rank: 1 },
              { uid: '100000002', score: 230.1, rank: 2 }
            ]
          }}
        />
      )
    },
    '/role-combat': {
      component: (
        <RoleCombatCard
          data={{
            uid: '100000001',
            has_data: true,
            has_detail_data: true,
            data: [
              {
                detail: {
                  rounds_data: [
                    {
                      avatars: [
                        { avatar_id: 10000002, avatar_type: 1, name: '神里绫华', element: '冰', level: 90, rarity: 5 }
                      ],
                      choice_cards: [{ name: '增幅', desc: '暴击伤害+40%' }],
                      buffs: [{ name: '祝福', desc: '攻击力+20%' }],
                      round_id: 1,
                      is_get_medal: true
                    }
                  ],
                  detail_stat: { difficulty_id: 1, max_round_id: 5, avatar_bonus_num: 2, rent_cnt: 0 },
                  backup_avatars: [{ avatar_id: 10000046, name: '胡桃', level: 90, rarity: 5 }]
                },
                stat: { difficulty_id: 1, max_round_id: 5, heresy_count: 3, avatar_bonus_num: 2, rent_cnt: 0, coin_num: 1000 },
                schedule: {
                  start_time: 1711900800,
                  end_time: 1713110400,
                  schedule_type: 1,
                  schedule_id: 1,
                  start_date_time: { year: '2026', month: '03', day: '01' },
                  end_date_time: { year: '2026', month: '03', day: '15' }
                }
              }
            ]
          }}
        />
      )
    },
    '/training-stat': {
      component: (
        <TrainingStatCard
          data={{
            game: 'gs',
            uid: '100000001',
            nickname: '旅行者',
            avatars: [
              {
                id: 10000002,
                name: '神里绫华',
                abbr: '绫华',
                element: '冰',
                rarity: 5,
                level: 90,
                cons: 6,
                fetter: 10,
                icon: '',
                sideIcon: '',
                weapon: { name: '雾切之回光', icon: '', level: 90, rarity: 5, affix: 1 }
              },
              {
                id: 10000031,
                name: '菲谢尔',
                abbr: '皇女',
                element: '雷',
                rarity: 4,
                level: 80,
                cons: 4,
                fetter: 10,
                icon: '',
                sideIcon: ''
              }
            ]
          }}
        />
      )
    },
    '/uid': {
      component: (
        <UidCard
          data={{
            uid: '100000001',
            game: 'gs',
            nickname: '旅行者',
            level: 60,
            isSelfCk: true,
            stats: {
              activeDay: 730,
              achievement: 820,
              wayPoint: 306,
              avatar: 52,
              avatar5: 18,
              goldCount: 45,
              commonChest: 2200,
              exquisiteChest: 1100,
              preciousChest: 500,
              luxuriousChest: 200,
              magicChest: 80
            },
            exploration: [
              { name: '蒙德', pct: 100 },
              { name: '龙脊雪山', pct: 98 },
              { name: '璃月', pct: 100 },
              { name: '层岩巨渊', pct: 88 },
              { name: '稻妻', pct: 96 },
              { name: '渊下宫', pct: 72 },
              { name: '须弥', pct: 95 },
              { name: '枫丹', pct: 85 }
            ],
            avatars: [
              { id: 10000002, name: '神里绫华', element: '冰', level: 90, rarity: 5, cons: 2, fetter: 10, icon: '' },
              { id: 10000003, name: '琴', element: '风', level: 90, rarity: 5, cons: 1, fetter: 10, icon: '' },
              { id: 10000005, name: '旅行者', element: '风', level: 90, rarity: 5, cons: 6, fetter: 10, icon: '' },
              { id: 10000042, name: '刻晴', element: '雷', level: 80, rarity: 5, cons: 0, fetter: 8, icon: '' },
              { id: 10000041, name: '莫娜', element: '水', level: 80, rarity: 5, cons: 1, fetter: 7, icon: '' },
              { id: 10000032, name: '班尼特', element: '火', level: 80, rarity: 4, cons: 5, fetter: 10, icon: '' },
              { id: 10000031, name: '菲谢尔', element: '雷', level: 70, rarity: 4, cons: 6, fetter: 10, icon: '' },
              { id: 10000014, name: '芭芭拉', element: '水', level: 70, rarity: 4, cons: 4, fetter: 6, icon: '' }
            ]
          }}
        />
      )
    },
    '/version': {
      component: (
        <VersionCard
          data={{
            name: 'Miao',
            version: '1.0.0',
            author: 'Miao',
            description: 'AlemonJS Edition'
          }}
        />
      )
    },
    '/weapon': {
      component: (
        <WeaponCard
          data={{
            uid: '100000001',
            avatars: [
              {
                id: 10000002,
                name: '神里绫华',
                rarity: 5,
                icon: '',
                weapon: { id: 11505, name: '雾切之回光', type: 1, rarity: 5, level: 90, promote_level: 6, affix_level: 1, icon: '' }
              },
              {
                id: 10000046,
                name: '胡桃',
                rarity: 5,
                icon: '',
                weapon: { id: 13501, name: '护摩之杖', type: 3, rarity: 5, level: 90, promote_level: 6, affix_level: 1, icon: '' }
              }
            ],
            filterText: ''
          }}
        />
      )
    },
    '/weapon-wiki': {
      component: <WeaponWikiCard data={{ name: '雾切之回光', rarity: 5, weaponType: '单手剑' }} />
    }
  }
});
