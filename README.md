# game-ffs-main

游戏首页门户，支持点击卡片跳转到不同游戏页面。

## 技术栈

- Vue 3 + TypeScript
- Naive UI
- UnoCSS
- Dayjs
- Vite (带 Hash 路由模式与相对路径构建)

## 本地运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建打包
pnpm build
```

## GitHub Pages 部署

在仓库 **Settings -> Pages** 中：
- **Source** 选择：`Deploy from a branch`
- **Branch** 选择：`gh-pages` / `/(root)`
- 点击 **Save** 即可发布上线。
