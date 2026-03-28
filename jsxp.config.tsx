import CalendarCard from '@src/img/views/CalendarCard';
import MiaoHelp from '@src/img/views/MiaoHelp';
import ProfileDetailCard from '@src/img/views/ProfileDetailCard';
import ProfileListCard from '@src/img/views/ProfileListCard';
import { defineConfig } from 'jsxp';
import React from 'react';

export default defineConfig({
  routes: {
    '/miao-help': {
      component: <MiaoHelp />
    },
    '/calendar': {
      component: (
        <CalendarCard data={{ game: 'gs', gameName: '原神', activities: [], now: '预览' }} />
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
    }
  }
});
