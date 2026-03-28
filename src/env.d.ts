/// <reference types="lvyjs/env" />
/// <reference types="alemonjs/env" />

import type { EventsEnum } from 'alemonjs';

declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.scss' {
  const src: string;
  export default src;
}
declare module '*.ttf' {
  const url: string;
  export default url;
}
declare module '*.md' {
  const url: string;
  export default url;
}

declare module 'alemonjs' {
  // 扩展原有的联合类型
  export type EventsEnum = EventsEnum & {
    miao?: {
      game: 'gs' | 'sr' | 'zzz';
    };
  };
}
