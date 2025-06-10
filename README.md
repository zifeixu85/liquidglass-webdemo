# Liquid Glass Kit - 本地开发环境设置

## 🚀 快速开始

### 1. 环境要求
- Node.js 18+ 
- npm 或 yarn

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 访问网站
打开浏览器访问: `http://localhost:5173`

## 📁 项目结构
```
src/
├── App.tsx              # 主应用组件
├── components/
│   └── VideoPlayer.tsx  # 视频播放器组件
├── index.css           # 全局样式和Liquid Glass效果
└── main.tsx            # 应用入口

public/                 # 静态资源
package.json           # 项目配置和依赖
```

## 🛠️ 可用命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run lint` - 代码检查

## 🎥 视频功能

网站支持两种视频播放方式：
1. **YouTube 嵌入** - 有YouTube ID的视频会在模态框中播放
2. **Apple 官网跳转** - 没有YouTube版本的会跳转到Apple开发者网站

## 🎨 设计特色

- ✨ Liquid Glass 液态玻璃效果
- 🌈 渐变背景和动态光球
- 📱 响应式设计
- 🎬 视频模态框播放
- 📧 双重邮件订阅入口
- 🍎 Apple 设计风格

## 📧 邮件订阅

网站包含两个邮件订阅入口：
1. **顶部横幅** - 可关闭的订阅提示
2. **页面底部** - 主要订阅区域

## 🌐 域名

网站域名: `liquidglass-kit.dev`

## 🔧 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (图标)

## 📱 响应式支持

- 桌面端 (1024px+)
- 平板端 (768px-1023px) 
- 移动端 (<768px)