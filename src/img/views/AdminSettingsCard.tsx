/**
 * 管理设置卡片 — 展示喵喵插件配置项
 */
import React from 'react';
import HTML from './HTML.js';
import { contStyle, contTitleStyle, elemBgUrl, FONT_FAMILY, FONT_NZBZ } from './shared.js';

export interface AdminSettingsData {
  type: string;
}

interface SettingItem {
  key: string;
  label: string;
  desc: string;
}

const SETTING_GROUPS: Record<string, { title: string; items: SettingItem[] }> = {
  profile: {
    title: '面板设置',
    items: [
      { key: 'profileApi', label: '面板数据源', desc: '面板服务API来源 (enka/miao)' },
      { key: 'profileCache', label: '面板缓存', desc: '缓存面板数据的时间 (分钟)' },
      { key: 'profileDmg', label: '面板伤害', desc: '面板详情是否显示伤害模拟' }
    ]
  },
  rank: {
    title: '排行设置',
    items: [
      { key: 'rankEnable', label: '排行开关', desc: '是否启用群内排行功能' },
      { key: 'rankLimit', label: '排行上限', desc: '排行榜展示上限条数' }
    ]
  },
  sys: {
    title: '系统设置',
    items: [
      { key: 'background', label: '背景模式', desc: '卡片背景显示模式 (0-4)' },
      { key: 'updateCheck', label: '更新检测', desc: '是否自动检测插件更新' }
    ]
  }
};

export default function AdminSettingsCard({ data }: { data: AdminSettingsData }) {
  const groups = data.type && SETTING_GROUPS[data.type] ? { [data.type]: SETTING_GROUPS[data.type] } : SETTING_GROUPS;

  return (
    <HTML style={{ width: '550px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundImage: `url(${elemBgUrl()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        {/* 头部 */}
        <div style={{ position: 'relative', padding: '20px 20px 10px' }}>
          <div style={{ fontFamily: FONT_NZBZ, fontSize: '32px', color: '#d3bc8e' }}>喵喵设置</div>
          <div style={{ fontSize: '13px', opacity: 0.5, marginTop: '4px' }}>使用 #喵喵xxx设置 修改配置项</div>
        </div>

        {/* 设置分组 */}
        {Object.entries(groups).map(([key, group]) => (
          <div key={key} style={contStyle()}>
            <div style={contTitleStyle()}>
              <span style={{ fontFamily: FONT_NZBZ, fontSize: '15px' }}>{group.title}</span>
            </div>
            <div style={{ padding: '10px 12px' }}>
              {group.items.map((item, i) => (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '8px 10px',
                    borderBottom: i < group.items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 'bold',
                      color: '#d3bc8e',
                      whiteSpace: 'nowrap',
                      minWidth: '80px'
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ fontSize: '12px', opacity: 0.5, flex: 1 }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 用法提示 */}
        <div style={contStyle()}>
          <div style={contTitleStyle()}>
            <span style={{ fontFamily: FONT_NZBZ, fontSize: '15px' }}>使用说明</span>
          </div>
          <div style={{ padding: '12px 16px', fontSize: '12px', opacity: 0.6, lineHeight: '1.6' }}>
            <div>· #喵喵设置 — 查看当前所有设置</div>
            <div>· #喵喵面板设置 — 查看面板相关设置</div>
            <div>· #喵喵排行设置 — 查看排行相关设置</div>
            <div>· #喵喵更新 — 更新插件到最新版本</div>
            <div>· #喵喵api — 查看API使用情况</div>
          </div>
        </div>

        {/* 底栏 */}
        <div style={{ position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 }}>Miao By ALemonJS</div>
      </div>
    </HTML>
  );
}
