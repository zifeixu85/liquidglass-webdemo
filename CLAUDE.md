# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器（端口 5173）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行 ESLint 检查
npm run lint
```

## 项目架构

这是一个展示 Apple "Liquid Glass" 设计系统的单页应用（SPA）。

### 技术栈
- **Vite** - 构建工具和开发服务器
- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS 框架
- **Lucide React** - 图标库

### 核心组件架构

**App.tsx** (src/App.tsx) 是唯一的主组件，包含了整个应用的所有功能模块：
- 顶部邮件订阅栏（可关闭）
- 响应式导航栏（滚动时添加毛玻璃效果）
- 多个内容区块（Hero、Overview、Features、Resources、Developers、Newsletter）
- 邮件订阅表单逻辑

### 样式系统

项目使用了分层的样式架构：

1. **Tailwind 基础样式** - 提供原子化 CSS 类
2. **自定义组件样式** (src/index.css)：
   - `.glass-card` - 毛玻璃卡片效果
   - `.glass-button` - 毛玻璃按钮样式
   - `.glass-orb` - 背景装饰动画球体
   - 使用 `backdrop-filter` 实现毛玻璃效果，包含降级方案

### 关键设计模式

1. **状态管理**: 使用 React hooks (useState, useEffect) 管理本地状态
2. **响应式设计**: 通过 Tailwind 的响应式前缀实现移动端适配
3. **动画效果**: 
   - CSS 动画（float、shimmer）
   - Tailwind 过渡效果
   - 滚动监听实现动态导航栏

### 项目结构特点

- 单文件组件架构 - 所有功能集中在 App.tsx 中
- 无路由系统 - 使用锚点链接实现页面内导航
- 无状态管理库 - 仅使用组件本地状态
- 静态内容 - 所有数据硬编码在组件中

### 构建配置

- Vite 配置中排除了 lucide-react 的依赖优化
- TypeScript 配置分为三个文件：tsconfig.json（主配置）、tsconfig.app.json（应用配置）、tsconfig.node.json（Node 配置）