# jsxp

## 约束

- 组件都用HTML进行包裹

- 设置图片宽度要在HTML组件上进行设置，且根据各自情况设定宽度大小来确保最佳

```tsx
<HTML style={{ width: 'px' }}></HTML>
```

- 背景图效果务必是在左上角开始自然放大

- 不能出现纯白/纯黑背景

- 不能出现白底白字，黑底黑字

- header或footer务必加上 Miao By ALemonJS

- 增删改组件务必在 jsxp.config.tsx 上补充或同步调整路由

- 尽量避免纯文本的图片，能带上icon、图片等素材的要带上
