/**
 * 版本信息卡片 — 展示插件版本与功能列表
 */
import React from 'react';
import HTML from './HTML.js';
import { contStyle, contTitleStyle, elemBgUrl, FONT_FAMILY, FONT_NZBZ } from './shared.js';

export interface VersionCardData {
  name: string;
  version: string;
  author: string;
  description: string;
}

const COMMAND_LIST = [
  { cmd: '#喵喵帮助', desc: '查看帮助菜单' },
  { cmd: '#xxx面板', desc: '查看角色面板详情' },
  { cmd: '#更新面板', desc: '更新面板数据' },
  { cmd: '#xxx天赋', desc: '查看角色天赋信息' },
  { cmd: '#xxx命座', desc: '查看角色命座信息' },
  { cmd: '#xxx资料', desc: '查看角色基础资料' },
  { cmd: '#圣遗物列表', desc: '查看圣遗物总览' },
  { cmd: '#练度统计', desc: '查看角色练度统计' },
  { cmd: '#深渊', desc: '查看深渊战绩' },
  { cmd: '#武器', desc: '查看武器列表' },
  { cmd: '#角色卡片', desc: '查看角色卡片' },
  { cmd: '#日历', desc: '查看活动日历' },
  { cmd: '#喵喵设置', desc: '管理插件设置' }
];

export default function VersionCard({ data }: { data: VersionCardData }) {
  return (
    <HTML style={{ width: '500px' }}>
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
        <div style={{ position: 'relative', padding: '24px 20px 12px' }}>
          <div style={{ fontFamily: FONT_NZBZ, fontSize: '32px', color: '#d3bc8e' }}>Miao</div>
          <div style={{ fontSize: '14px', opacity: 0.6, marginTop: '4px' }}>AlemonJS Edition</div>
          <div
            style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '3px 14px',
              borderRadius: '12px',
              background: 'rgba(98,168,234,0.6)',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            v{data.version}
          </div>
        </div>

        {/* 插件信息 */}
        <div style={contStyle()}>
          <div style={contTitleStyle()}>
            <span style={{ fontFamily: FONT_NZBZ, fontSize: '16px' }}>插件信息</span>
          </div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 14px',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: '6px'
              }}
            >
              <span style={{ fontSize: '13px', opacity: 0.7 }}>作者</span>
              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{data.author}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 14px',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: '6px'
              }}
            >
              <span style={{ fontSize: '13px', opacity: 0.7 }}>框架</span>
              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>AlemonJS</span>
            </div>
            <div
              style={{
                padding: '6px 14px',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: '6px',
                fontSize: '12px',
                opacity: 0.7
              }}
            >
              {data.description}
            </div>
          </div>
        </div>

        {/* 功能列表 */}
        <div style={contStyle()}>
          <div style={contTitleStyle()}>
            <span style={{ fontFamily: FONT_NZBZ, fontSize: '16px' }}>支持的指令</span>
          </div>
          <div style={{ padding: '10px 12px' }}>
            {COMMAND_LIST.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px 8px',
                  borderBottom: i < COMMAND_LIST.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  gap: '10px'
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#d3bc8e',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.cmd}
                </span>
                <span style={{ fontSize: '12px', opacity: 0.5 }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 底栏 */}
        <div style={{ position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 }}>Miao By ALemonJS</div>
      </div>
    </HTML>
  );
}
