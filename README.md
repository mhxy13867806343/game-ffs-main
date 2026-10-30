# game-ffs-main

游戏首页门户，支持点击卡片跳转到不同游戏与文档页面。

- **在线预览体验**：[https://mhxy13867806343.github.io/game-ffs-main/#/](https://mhxy13867806343.github.io/game-ffs-main/#/)
- **《裂空之羽》(子页面)**：[https://mhxy13867806343.github.io/game-ffs-main/#/feather](https://mhxy13867806343.github.io/game-ffs-main/#/feather)
  - 试玩作战：[https://mhxy13867806343.github.io/game-ffs-main/#/feather/play](https://mhxy13867806343.github.io/game-ffs-main/#/feather/play)
  - 8章48关战役：[https://mhxy13867806343.github.io/game-ffs-main/#/feather/stages](https://mhxy13867806343.github.io/game-ffs-main/#/feather/stages)
  - 策划设计文档：[https://mhxy13867806343.github.io/game-ffs-main/#/feather/doc](https://mhxy13867806343.github.io/game-ffs-main/#/feather/doc)
- **最终幻想：时空之轮 (子页面)**：[https://mhxy13867806343.github.io/game-ffs-main/#/vble](https://mhxy13867806343.github.io/game-ffs-main/#/vble)
  - 二十七卷技术白皮书大典：[https://mhxy13867806343.github.io/game-ffs-main/#/vble/docs](https://mhxy13867806343.github.io/game-ffs-main/#/vble/docs)
  - 游戏设计总纲大纲 (VOL.25)：[https://mhxy13867806343.github.io/game-ffs-main/#/vble/docs/25_MASTER_GAME_DESIGN_DOCUMENT](https://mhxy13867806343.github.io/game-ffs-main/#/vble/docs/25_MASTER_GAME_DESIGN_DOCUMENT)
  - 全域研发规程规范 (VOL.26)：[https://mhxy13867806343.github.io/game-ffs-main/#/vble/docs/26_LATEST_DEV_SPEC](https://mhxy13867806343.github.io/game-ffs-main/#/vble/docs/26_LATEST_DEV_SPEC)
  - 跨界魔物全景大典 (VOL.27)：[https://mhxy13867806343.github.io/game-ffs-main/#/vble/docs/27_CROSS_WORLD_BOSSES_AND_MONSTERS_SPEC](https://mhxy13867806343.github.io/game-ffs-main/#/vble/docs/27_CROSS_WORLD_BOSSES_AND_MONSTERS_SPEC)
  - 核心架构与系统机制：[https://mhxy13867806343.github.io/game-ffs-main/#/vble/systems](https://mhxy13867806343.github.io/game-ffs-main/#/vble/systems)
  - 更新演进与时间线：[https://mhxy13867806343.github.io/game-ffs-main/#/vble/updates](https://mhxy13867806343.github.io/game-ffs-main/#/vble/updates)
- **AI H5 游戏合集**：[https://mhxy13867806343.github.io/ai-h5-games/](https://mhxy13867806343.github.io/ai-h5-games/)

---

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
- 访问地址：[https://mhxy13867806343.github.io/game-ffs-main/#/](https://mhxy13867806343.github.io/game-ffs-main/#/)
