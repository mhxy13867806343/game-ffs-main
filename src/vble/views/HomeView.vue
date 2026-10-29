<template>
  <div class="home-portal space-y-8 md:space-y-10">
    <!-- 顶部单机发布广播条 -->
    <div class="portal-marquee flex items-center justify-between px-3 md:px-4 py-2 bg-gradient-to-r from-amber-950/40 via-purple-950/50 to-cyan-950/40 border-y border-amber-500/20 text-xs">
      <div class="flex items-center gap-2 overflow-hidden">
        <span class="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] md:text-[11px] animate-pulse flex-shrink-0">RELEASE</span>
        <span class="text-amber-300 font-semibold flex-shrink-0">【v2.2.343 双月宇宙旗舰版】</span>
        <span class="text-gray-300 truncate text-[11px] md:text-xs">
          【全域时空裂隙双月宇宙门户总览、世界线态势雷达与全景航行中枢工坊重磅实装！Godot 4.6 LTS 离线运行引擎矩阵】
        </span>
      </div>
      <div class="hidden lg:flex items-center gap-4 text-gray-400 flex-shrink-0">
        <span>单机运行引擎: <strong class="text-cyan-400 font-mono">Godot 4.6 (Offline)</strong></span>
        <span class="text-slate-600">|</span>
        <router-link to="/vble/docs" class="text-amber-400 hover:text-amber-300 transition-colors">版本白皮书 &rarr;</router-link>
      </div>
    </div>

    <!-- 核心第一屏：网易旗舰门户双栏大视窗 (轮播焦点 + 资讯看板 VS 客户端极速入口) -->
    <section class="portal-hero-grid max-w-7xl mx-auto px-3 sm:px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- 左侧 8 栏：超大焦点轮播图 + 标签式新闻资讯中心 -->
        <div class="lg:col-span-8 space-y-6">
          <!-- 焦点大图轮播 -->
          <div class="carousel-container rounded-2xl overflow-hidden border border-slate-700/60 shadow-[0_0_25px_rgba(0,0,0,0.6)] relative group">
            <n-carousel autoplay dot-type="line" show-arrow class="h-56 sm:h-72 md:h-96">
              <div
                v-for="banner in homeCarouselBanners"
                :key="banner.id"
                class="carousel-slide relative h-full w-full cursor-pointer"
                @click="router.push(banner.link)"
              >
                <img
                  :src="banner.image"
                  :alt="banner.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a0d18] via-[#0a0d18]/50 to-transparent flex flex-col justify-end p-4 sm:p-6">
                  <div class="flex items-center gap-2 mb-1 sm:mb-2">
                    <n-tag size="small" type="warning" round strong>{{ banner.tag }}</n-tag>
                    <span class="text-[10px] sm:text-xs text-cyan-300 font-mono">CHRONO TWILIGHT</span>
                  </div>
                  <h2 class="text-base sm:text-xl md:text-2xl font-black text-white text-glow-amber mb-1 sm:mb-2 leading-snug">
                    {{ banner.title }}
                  </h2>
                  <p class="text-[11px] sm:text-xs text-gray-300 line-clamp-2 max-w-2xl">
                    {{ banner.desc }}
                  </p>
                </div>
              </div>
            </n-carousel>
          </div>

          <!-- 新闻资讯看板 -->
          <n-card class="news-board-card border border-slate-700/60 bg-[#121626]/90 rounded-2xl" size="small">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
              <div class="flex items-center gap-2">
                <span class="text-lg">📢</span>
                <span class="text-base sm:text-lg font-bold text-gray-100">单机档案与版本资讯</span>
              </div>
              <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  v-for="tab in newsTabs"
                  :key="tab.id"
                  type="button"
                  class="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border select-none whitespace-nowrap"
                  :class="activeNewsTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.45)]'
                    : 'bg-slate-800 text-gray-200 border-slate-700 hover:(bg-slate-700 text-white border-slate-500)'"
                  @click="activeNewsTab = tab.id"
                >
                  {{ tab.name }}
                </button>
                <!-- 在特权的右边加一个“更多” (点进去展示一个列表 上面有分类的) -->
                <button
                  type="button"
                  class="px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-950/40 border border-amber-600/60 hover:(bg-amber-900/50 border-amber-500) transition-all cursor-pointer ml-1 select-none whitespace-nowrap"
                  title="点击查看全部分类资讯列表"
                  @click="navigateToMoreNews"
                >
                  更多 &rarr;
                </button>
              </div>
            </div>

            <!-- 头条推荐文章 -->
            <div
              v-if="headlineNews"
              class="headline-box p-3 bg-gradient-to-r from-red-950/30 via-slate-900/60 to-transparent rounded-xl border border-red-900/30 mb-3 cursor-pointer hover:border-red-500/50 transition-all flex items-center justify-between gap-2"
              @click="router.push(headlineNews.link)"
            >
              <div class="flex items-center gap-2 overflow-hidden">
                <n-tag size="tiny" type="error" round>精选</n-tag>
                <span class="text-xs sm:text-sm font-bold text-amber-300 hover:text-amber-200 truncate">
                  {{ headlineNews.title }}
                </span>
              </div>
              <span class="text-[11px] text-gray-500 font-mono flex-shrink-0">{{ headlineNews.date }}</span>
            </div>

            <!-- 新闻列表 -->
            <div class="news-list divide-y divide-slate-800/60 text-xs">
              <div
                v-for="item in filteredNews"
                :key="item.id"
                class="news-row py-2.5 flex items-center justify-between hover:bg-slate-800/40 px-2 rounded cursor-pointer transition-colors gap-2"
                @click="router.push(item.link)"
              >
                <div class="flex items-center gap-2 overflow-hidden">
                  <n-tag size="tiny" :type="item.tagType">{{ item.typeLabel }}</n-tag>
                  <span class="text-gray-300 hover:text-cyan-300 truncate">
                    {{ item.title }}
                  </span>
                  <span v-if="item.isHot" class="text-[10px] text-red-400 font-bold flex-shrink-0">HOT</span>
                </div>
                <span class="text-gray-500 font-mono flex-shrink-0">{{ item.date }}</span>
              </div>
            </div>

            <!-- 底部更多档案直通入口 -->
            <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span class="text-gray-500">更多版本通告与探索机密</span>
              <span
                class="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer inline-flex items-center gap-1 group transition-colors"
                @click="navigateToMoreNews"
              >
                <span>进入单机档案列表</span>
                <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </div>
          </n-card>
        </div>

        <!-- 右侧 4 栏：下载客户端主视觉 + 快捷特权专区 + 单机模式状态 -->
        <div class="lg:col-span-4 space-y-6">
          <!-- 极速启动与进入游戏大按键 -->
          <div class="download-box p-5 bg-gradient-to-b from-[#19223c] to-[#0f1424] rounded-2xl border-2 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] text-center relative overflow-hidden">
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
            
            <div class="mb-4">
              <span class="text-xs text-amber-400 tracking-widest font-semibold uppercase">Standalone JRPG Engine</span>
              <h3 class="text-xl font-extrabold text-white mt-1">最终幻想：时空之轮</h3>
              <p class="text-[11px] text-gray-400 mt-1">版本 v2.2.241 · 离线单机桌面运行端</p>
            </div>

            <!-- 巨型下载客户端启动按钮 (直通四大网盘下载中心) -->
            <button
              class="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black text-base sm:text-lg shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mb-2 group"
              title="点击进入客户端下载中心，获取百度/123/阿里/夸克四大网盘资源"
              @click="router.push('/vble/download')"
            >
              <span class="text-xl sm:text-2xl group-hover:scale-110 transition-transform">📥</span>
              <span>下载游戏客户端 (全网盘)</span>
            </button>
            <div class="text-[11px] text-gray-400 mb-4 flex items-center justify-center gap-2 cursor-pointer hover:text-cyan-300 transition-colors" @click="router.push('/vble/download')">
              <span class="text-cyan-400 font-semibold">⚡ 123云盘</span>
              <span class="text-slate-600">|</span>
              <span class="text-blue-400 font-semibold">🟢 百度</span>
              <span class="text-slate-600">|</span>
              <span class="text-orange-400 font-semibold">🚀 阿里</span>
              <span class="text-slate-600">|</span>
              <span class="text-purple-400 font-semibold">🌀 夸克</span>
            </div>

            <!-- 经典运营快捷功能磁贴 (更新/规划/礼包/七色尾巴/白皮书/图鉴) -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div
                class="p-2.5 bg-blue-950/40 rounded-lg border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all flex items-center gap-2"
                @click="router.push('/vble/updates')"
              >
                <span class="text-base">🔄</span>
                <div class="text-left">
                  <div class="font-bold text-cyan-200">最新更新</div>
                  <div class="text-[10px] text-gray-400">v2.2.241动态</div>
                </div>
              </div>

              <div
                class="p-2.5 bg-amber-950/40 rounded-lg border border-amber-500/30 hover:border-amber-400 cursor-pointer transition-all flex items-center gap-2"
                @click="router.push('/vble/roadmap')"
              >
                <span class="text-base">🚀</span>
                <div class="text-left">
                  <div class="font-bold text-amber-200">功能规划</div>
                  <div class="text-[10px] text-gray-400">路线图展望</div>
                </div>
              </div>

              <div
                class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 hover:border-cyan-400/50 cursor-pointer transition-all flex items-center gap-2"
                @click="router.push('/vble/sidequests')"
              >
                <span class="text-base">🎁</span>
                <div class="text-left">
                  <div class="font-bold text-gray-200">通关礼包</div>
                  <div class="text-[10px] text-gray-500">成就解锁</div>
                </div>
              </div>

              <div
                class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 hover:border-cyan-400/50 cursor-pointer transition-all flex items-center gap-2"
                @click="router.push('/vble/economy')"
              >
                <span class="text-base">🦊</span>
                <div class="text-left">
                  <div class="font-bold text-gray-200">七色尾巴</div>
                  <div class="text-[10px] text-gray-500">神器兑换</div>
                </div>
              </div>

              <div
                class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 hover:border-cyan-400/50 cursor-pointer transition-all flex items-center gap-2"
                @click="router.push('/vble/docs')"
              >
                <span class="text-base">📜</span>
                <div class="text-left">
                  <div class="font-bold text-gray-200">架构白皮书</div>
                  <div class="text-[10px] text-gray-500">16卷文库</div>
                </div>
              </div>

              <div
                class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 hover:border-cyan-400/50 cursor-pointer transition-all flex items-center gap-2"
                @click="router.push('/vble/search')"
              >
                <span class="text-base">🔍</span>
                <div class="text-left">
                  <div class="font-bold text-gray-200">全域图鉴</div>
                  <div class="text-[10px] text-gray-500">离线检索</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 单机游玩模式与环境状态 (彻底替换原来的在线服务器卡片) -->
          <n-card class="game-modes-card border border-slate-700/60 bg-[#121626]/90 rounded-2xl" size="small">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div class="flex items-center gap-2">
                <span class="text-base">🎮</span>
                <span class="font-bold text-sm text-gray-200">单机游玩模式与环境</span>
              </div>
              <n-tag size="tiny" type="info" round>离线单机</n-tag>
            </div>

            <div class="space-y-2 text-xs">
              <div
                v-for="mode in homeGameModes"
                :key="mode.name"
                class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1"
              >
                <div class="flex items-center justify-between">
                  <span class="font-bold text-gray-200 text-xs">{{ mode.name }}</span>
                  <n-tag size="tiny" :type="mode.tagType">
                    {{ mode.statusText }}
                  </n-tag>
                </div>
                <p class="text-[11px] text-gray-400 leading-tight">{{ mode.desc }}</p>
              </div>
            </div>
          </n-card>

          <!-- 4 大核心数据统计柱 -->
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
              <div class="text-2xl font-black text-amber-400">30</div>
              <div class="text-[11px] text-gray-400">单机战役篇章</div>
            </div>
            <div class="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
              <div class="text-2xl font-black text-cyan-400">26</div>
              <div class="text-[11px] text-gray-400">水晶经典职业</div>
            </div>
            <div class="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
              <div class="text-2xl font-black text-green-400">18</div>
              <div class="text-[11px] text-gray-400">核心秘境地城</div>
            </div>
            <div class="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
              <div class="text-2xl font-black text-purple-400">49</div>
              <div class="text-[11px] text-gray-400">深渊竞技场</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 第二屏：英雄与角色互动展台 -->
    <section class="portal-heroes-showcase max-w-7xl mx-auto px-3 sm:px-4">
      <div class="section-header text-center mb-6">
        <n-tag type="warning" size="small" round class="mb-2">Heroes & Destined Champions</n-tag>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-glow-amber">光与暗宿命英雄展台</h2>
        <p class="text-xs sm:text-sm text-gray-400 mt-1">点击英雄查看其战术流派、招牌必杀与契约神器</p>
      </div>

      <div class="bg-[#121626]/90 border border-slate-700/60 rounded-2xl p-4 sm:p-6 shadow-xl">
        <!-- 英雄选项卡 -->
        <div class="flex flex-wrap gap-2 justify-center mb-6">
          <n-button
            v-for="hero in homeHeroShowcase"
            :key="hero.id"
            size="small"
            :type="selectedHeroId === hero.id ? 'primary' : 'default'"
            round
            secondary
            @click="selectedHeroId = hero.id"
          >
            {{ hero.name }} · {{ hero.party }}
          </n-button>
        </div>

        <!-- 展台主体内容 -->
        <div v-if="activeHero" class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          <!-- 英雄立绘海报区 -->
          <div class="md:col-span-5 relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_20px_rgba(0,243,255,0.15)] h-64 sm:h-80 md:h-88">
            <img :src="activeHero.image" :alt="activeHero.name" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0a0d18] via-transparent to-transparent flex items-end p-4">
              <span class="text-lg sm:text-xl font-black text-white text-glow-cyan">{{ activeHero.name }}</span>
            </div>
          </div>

          <!-- 英雄详细数据面板 -->
          <div class="md:col-span-7 space-y-3 sm:space-y-4">
            <div>
              <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                <h3 class="text-xl sm:text-2xl font-black text-amber-300">{{ activeHero.name }}</h3>
                <n-tag size="small" type="warning">{{ activeHero.job }}</n-tag>
                <n-tag size="small" type="info">{{ activeHero.party }}</n-tag>
              </div>
              <div class="text-xs sm:text-sm text-cyan-400 font-semibold mt-1">{{ activeHero.title }}</div>
            </div>

            <div class="text-xs text-purple-300 italic border-l-2 border-purple-500/50 pl-3 py-1 bg-purple-950/20 rounded">
              {{ activeHero.quote }}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
              <div class="p-2.5 sm:p-3 bg-slate-900/80 rounded border border-slate-800">
                <span class="text-gray-400 block mb-1">🗡️ 专属神兵:</span>
                <span class="text-amber-300 font-bold">{{ activeHero.weapon }}</span>
              </div>
              <div class="p-2.5 sm:p-3 bg-slate-900/80 rounded border border-slate-800">
                <span class="text-gray-400 block mb-1">⚡ 极意必杀:</span>
                <span class="text-cyan-300 font-bold">{{ activeHero.skill }}</span>
              </div>
            </div>

            <p class="text-xs text-gray-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              {{ activeHero.desc }}
            </p>

            <div class="flex gap-3 pt-2">
              <n-button type="primary" size="small" @click="router.push('/vble/characters')">
                查看全英雄属性盘 ↗
              </n-button>
              <n-button type="default" size="small" secondary @click="router.push('/vble/jobs')">
                转职继承树
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 第三屏：游戏核心四大玩法特色矩阵 -->
    <section class="portal-features max-w-7xl mx-auto px-3 sm:px-4">
      <div class="section-header text-center mb-6">
        <n-tag type="info" size="small" round class="mb-2">Core Game Mechanics</n-tag>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-glow-cyan">四大核心革新特色</h2>
        <p class="text-xs sm:text-sm text-gray-400 mt-1">回归黄金时代 JRPG 单机精髓，融合次世代动态回合制</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <n-card
          hoverable
          class="feature-card border border-slate-700/60 bg-[#121626]/90 rounded-2xl cursor-pointer hover:border-cyan-400/50 transition-all hover:-translate-y-1"
          @click="router.push('/vble/dungeons')"
        >
          <div class="text-3xl mb-3">🏰</div>
          <h4 class="text-base font-bold text-gray-100 mb-1">全域空间地貌</h4>
          <p class="text-xs text-gray-400 leading-relaxed mb-3">
            18 大地下城，涵盖苍穹浮空城、300 米深海海沟、地狱冥界与终焉虚无核心。
          </p>
          <span class="text-xs text-cyan-400 font-medium">查看地貌拓扑 &rarr;</span>
        </n-card>

        <n-card
          hoverable
          class="feature-card border border-slate-700/60 bg-[#121626]/90 rounded-2xl cursor-pointer hover:border-cyan-400/50 transition-all hover:-translate-y-1"
          @click="router.push('/vble/battle-tactics')"
        >
          <div class="text-3xl mb-3">⏳</div>
          <h4 class="text-base font-bold text-gray-100 mb-1">ATB 限回合决算</h4>
          <p class="text-xs text-gray-400 leading-relaxed mb-3">
            宝箱首领越级动态衰减惩罚、生死猜拳破招 200% 暴击与史莱姆流体闪避。
          </p>
          <span class="text-xs text-cyan-400 font-medium">体验战斗模拟 &rarr;</span>
        </n-card>

        <n-card
          hoverable
          class="feature-card border border-slate-700/60 bg-[#121626]/90 rounded-2xl cursor-pointer hover:border-cyan-400/50 transition-all hover:-translate-y-1"
          @click="router.push('/vble/summons')"
        >
          <div class="text-3xl mb-3">🐉</div>
          <h4 class="text-base font-bold text-gray-100 mb-1">十二神兽契约</h4>
          <p class="text-xs text-gray-400 leading-relaxed mb-3">
            龙王巴哈姆特亿万核爆、利维亚桑大海啸、黑铁骑皇奥丁一分钟斩铁战。
          </p>
          <span class="text-xs text-cyan-400 font-medium">探索召唤图鉴 &rarr;</span>
        </n-card>

        <n-card
          hoverable
          class="feature-card border border-slate-700/60 bg-[#121626]/90 rounded-2xl cursor-pointer hover:border-cyan-400/50 transition-all hover:-translate-y-1"
          @click="router.push('/vble/economy')"
        >
          <div class="text-3xl mb-3">⚗️</div>
          <h4 class="text-base font-bold text-gray-100 mb-1">宏观经济与调合</h4>
          <p class="text-xs text-gray-400 leading-relaxed mb-3">
            药剂师质变两两调合、隐士洞窟七色尾巴兑换、五阶城邦商业贸易网络。
          </p>
          <span class="text-xs text-cyan-400 font-medium">进入调合工坊 &rarr;</span>
        </n-card>
      </div>
    </section>

    <!-- 第四屏：藏经阁 / 玩家快速攻略百科入口 -->
    <section class="portal-guides max-w-7xl mx-auto px-3 sm:px-4">
      <div class="section-header text-center mb-6">
        <n-tag type="success" size="small" round class="mb-2">Strategy Library & Guides</n-tag>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-glow-amber">藏经阁 · 玩家必读攻坚宝典</h2>
        <p class="text-xs sm:text-sm text-gray-400 mt-1">从新手拓荒到深渊终极超越，快速查阅专业攻略</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="guide in homeGuideShortcuts"
          :key="guide.title"
          class="p-4 bg-[#121626]/90 border border-slate-700/60 rounded-xl hover:border-amber-400/50 transition-all cursor-pointer group"
          @click="router.push(guide.link)"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-bold text-gray-200 group-hover:text-amber-300 transition-colors">{{ guide.title }}</span>
            <n-tag size="tiny" type="warning">{{ guide.tag }}</n-tag>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">{{ guide.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 全平台一键社交分享 -->
    <div class="max-w-7xl mx-auto px-3 sm:px-4">
      <SocialShareBar mode="banner" />
    </div>

    <!-- 第五屏：实机画廊精选视效展示 -->
    <section class="portal-gallery-preview max-w-7xl mx-auto px-3 sm:px-4">
      <div class="section-header flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-100">🖼️ 实机视效与沉浸画廊</h3>
          <p class="text-xs text-gray-400">像素艺术融合次世代粒子渲染的光影世界</p>
        </div>
        <router-link to="/vble/gallery" class="text-xs text-cyan-400 hover:text-cyan-300">查看完整画廊 &rarr;</router-link>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div
          v-for="img in galleryPreviews"
          :key="img.src"
          class="rounded-xl overflow-hidden border border-slate-800 h-28 sm:h-36 relative group cursor-pointer"
          @click="router.push('/vble/gallery')"
        >
          <img :src="img.src" :alt="img.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="text-xs text-white font-bold bg-black/60 px-2 py-1 rounded">{{ img.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 三百版本里程碑大典：全域时空裂隙核心门户、三十维全息矩阵与太古创世终极枢纽工坊 (Omni Nexus Studio v2.2.300) -->
    <section id="nexus-studio" class="max-w-7xl mx-auto px-3 sm:px-4 space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/80 via-slate-900/95 to-cyan-950/80 border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.28)] space-y-6 relative overflow-hidden">
        <div class="absolute -right-24 -top-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-24 -bottom-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <!-- 头部与控制栏 -->
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/60 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class="px-2.5 py-0.5 rounded text-[11px] font-black font-mono bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 text-slate-950 shadow-md animate-pulse">
                v2.2.300 MILESTONE JUBILEE
              </span>
              <span class="text-xs text-amber-300 font-mono font-bold">全域 300 版本史诗演进大典</span>
            </div>
            <h2 class="text-xl sm:text-3xl font-black text-white flex items-center gap-2 tracking-tight">
              <span>🏛️</span> 全域时空裂隙核心门户、三十维全息矩阵与太古创世终极枢纽工坊
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl leading-relaxed">
              对齐 Godot 4.6 LTS 终极架构标准：深度集成四大终极枢纽维度、四维连续全息微调滑块、三大神圣因果保护断路器、五阶段创世仿真推演与 v2.2.300 终极防伪方案书离线导出。
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0 flex-wrap relative z-10">
            <n-button size="small" secondary type="warning" @click="resetNexusParameters">
              🔄 重置枢纽参数
            </n-button>
            <n-button size="small" type="primary" class="font-bold shadow" @click="exportNexusCertificate">
              📜 导出 300 版本大典证书
            </n-button>
          </div>
        </div>

        <!-- 四大终极枢纽维度卡片 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
          <div
            v-for="arch in nexusArchetypes"
            :key="arch.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedNexusId === arch.id
              ? 'bg-amber-950/50 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/60'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'"
            @click="selectedNexusId = arch.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ arch.icon }}</span>
              <n-tag :type="selectedNexusId === arch.id ? 'warning' : 'default'" size="tiny" round>
                {{ arch.tag }}
              </n-tag>
            </div>
            <div class="text-sm font-bold text-white mb-1">{{ arch.name }}</div>
            <div class="text-[11px] text-gray-400 leading-relaxed mb-3">{{ arch.desc }}</div>
            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span class="text-gray-400">核心能效</span>
              <span class="text-amber-300 font-semibold">{{ arch.perk }}</span>
            </div>
          </div>
        </div>

        <!-- 参数微调滑块与安全防护盾 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
          <!-- 左侧: 4维连续参数调节 (7 cols) -->
          <div class="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <span class="text-amber-400 font-bold text-sm">🎛️ 全域终极枢纽连续调控矩阵</span>
                <span class="text-[11px] text-gray-400 font-mono">4-Axis Omni Nexus Sliders</span>
              </div>
              <button
                type="button"
                class="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                @click="resetNexusParameters"
              >
                重置参数
              </button>
            </div>

            <!-- 滑块 1: 全域枢纽吞吐通量 -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-300 font-medium flex items-center gap-1.5">
                  <span>⚡</span> 全域枢纽吞吐通量 (Nexus Throughput)
                </span>
                <span class="font-mono text-cyan-400 font-bold">{{ portalThroughput }} OPS/s</span>
              </div>
              <n-slider
                v-model:value="portalThroughput"
                :min="100"
                :max="5000"
                :step="100"
                :tooltip="false"
              />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>100 OPS (常规单机)</span>
                <span>2500 OPS (高并发集群)</span>
                <span>5000 OPS (极限超光速)</span>
              </div>
            </div>

            <!-- 滑块 2: 多元宇宙平衡熵 -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-300 font-medium flex items-center gap-1.5">
                  <span>🌌</span> 多元宇宙平衡熵 (Multiverse Entropy)
                </span>
                <span class="font-mono text-amber-400 font-bold">{{ multiverseEntropy.toFixed(1) }} S/k</span>
              </div>
              <n-slider
                v-model:value="multiverseEntropy"
                :min="0.1"
                :max="5.0"
                :step="0.1"
                :tooltip="false"
              />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>0.1 S/k (绝对稳恒态)</span>
                <span>2.5 S/k (经典动态平衡)</span>
                <span>5.0 S/k (时空宏伟跃迁)</span>
              </div>
            </div>

            <!-- 滑块 3: 全域帧时延控制预算 -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-300 font-medium flex items-center gap-1.5">
                  <span>⏱️</span> 全域帧时延控制预算 (Latency Budget)
                </span>
                <span class="font-mono text-rose-400 font-bold">{{ latencyBudget.toFixed(1) }} ms ({{ Math.round(1000 / latencyBudget) }} FPS)</span>
              </div>
              <n-slider
                v-model:value="latencyBudget"
                :min="1.0"
                :max="16.6"
                :step="0.2"
                :tooltip="false"
              />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>1.0 ms (1000 FPS 超低延迟)</span>
                <span>4.2 ms (240 FPS 电竞级)</span>
                <span>16.6 ms (60 FPS 锁帧标准)</span>
              </div>
            </div>

            <!-- 滑块 4: 太古以太共鸣相干率 -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-300 font-medium flex items-center gap-1.5">
                  <span>✨</span> 太古以太共鸣相干率 (Resonance Coherence)
                </span>
                <span class="font-mono text-purple-400 font-bold">{{ aetherResonanceIndex }}%</span>
              </div>
              <n-slider
                v-model:value="aetherResonanceIndex"
                :min="50"
                :max="200"
                :step="5"
                :tooltip="false"
              />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>50% (低相干微弱态)</span>
                <span>120% (纯净以太共鸣)</span>
                <span>200% (神圣无限光子)</span>
              </div>
            </div>
          </div>

          <!-- 右侧: 3大神圣保护断路器 (5 cols) -->
          <div class="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
            <div class="flex items-center gap-2 pb-3 border-b border-slate-800">
              <span class="text-amber-400 font-bold text-sm">🛡️ 三百版本神圣断路器与特权</span>
              <n-tag type="warning" size="tiny" round>终极里程碑特权</n-tag>
            </div>

            <div class="space-y-3">
              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                <div class="space-y-0.5">
                  <div class="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🔒</span> 全知全能因果律防坍缩护盾
                  </div>
                  <div class="text-[11px] text-gray-400">阻断时空逻辑闭环回路，全域系统崩溃零风险</div>
                </div>
                <n-switch v-model:value="omnipotentCausalityShield" size="small" />
              </div>

              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                <div class="space-y-0.5">
                  <div class="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>⚡</span> 零停机动态热插拔原子锁
                  </div>
                  <div class="text-[11px] text-gray-400">版本补丁与系统组件无缝无感热重载零中断</div>
                </div>
                <n-switch v-model:value="zeroDowntimeHotSwapLock" size="small" />
              </div>

              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                <div class="space-y-0.5">
                  <div class="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>👑</span> v2.2.300 终极破限神印
                  </div>
                  <div class="text-[11px] text-gray-400">全角色、神兵与技能彻底打破数值上限天花板</div>
                </div>
                <n-switch v-model:value="transcendenceCapBreaker300" size="small" />
              </div>
            </div>

            <!-- 能效雷达卡 -->
            <div class="p-3 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 space-y-2">
              <div class="text-xs font-bold text-cyan-300 flex items-center justify-between">
                <span>全域系统架构稳健指数</span>
                <span class="font-mono text-emerald-400 font-bold">{{ calculatedHealthSafety.toFixed(1) }}%</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400 h-1.5 rounded-full transition-all duration-300"
                  :style="{ width: Math.min(calculatedHealthSafety, 100) + '%' }"
                ></div>
              </div>
              <div class="text-[10px] text-gray-400 flex justify-between">
                <span>吞吐负荷: {{ calculatedThroughputOps }} OPS</span>
                <span class="text-emerald-400">神圣稳态: {{ calculatedHealthSafety > 98 ? '太古创世完备' : '高稳健态' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 实时解算数值仪表盘 -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
          <div class="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 text-center shadow-lg">
            <div class="text-[11px] text-gray-400">全域枢纽综合能效 (Score)</div>
            <div class="text-2xl font-black text-amber-400 font-mono mt-1">{{ calculatedNexusScore.toLocaleString() }}</div>
            <div class="text-[10px] text-amber-300/80 mt-0.5">300版本全息评级加权</div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center shadow-lg">
            <div class="text-[11px] text-gray-400">瞬时微秒级并发吞吐</div>
            <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ calculatedThroughputOps.toLocaleString() }} OPS</div>
            <div class="text-[10px] text-cyan-300/80 mt-0.5">零拷贝并发流水线</div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-center shadow-lg">
            <div class="text-[11px] text-gray-400">全系统全维健康度</div>
            <div class="text-2xl font-black text-emerald-400 font-mono mt-1">{{ calculatedHealthSafety.toFixed(1) }}%</div>
            <div class="text-[10px] text-emerald-300/80 mt-0.5">杜绝死锁与崩溃零异常</div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 text-center shadow-lg">
            <div class="text-[11px] text-gray-400">终极里程碑认证位阶</div>
            <div class="text-2xl font-black text-purple-400 font-mono mt-1">{{ milestoneRankTier }}</div>
            <div class="text-[10px] text-purple-300/80 mt-0.5">v2.2.300 始源超维认证</div>
          </div>
        </div>

        <!-- 五阶段终极枢纽仿真推演终端 -->
        <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-amber-500/30 shadow-2xl space-y-4 relative z-10">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="text-amber-400 font-bold text-sm">⚡ 全域时空裂隙核心门户与三十维全息矩阵五阶段推演终端</span>
              <n-tag type="warning" size="tiny" round>Live Jubilee Pipeline</n-tag>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md disabled:opacity-50"
                :disabled="isSimulatingNexus"
                @click="runNexusSimulation"
              >
                {{ isSimulatingNexus ? '正在推演全域枢纽中...' : '▶ 启动全流程 300 版本大典推演' }}
              </button>
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 transition-all cursor-pointer"
                @click="exportNexusCertificate"
              >
                📜 导出 300 版本大典证书
              </button>
            </div>
          </div>

          <!-- 5 阶段步进进度 -->
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
            <div
              v-for="(stg, idx) in nexusStages"
              :key="stg.id"
              class="p-2.5 rounded-lg border text-xs transition-all flex flex-col justify-between"
              :class="nexusSimulationStep >= idx + 1
                ? 'bg-amber-950/40 border-amber-500/60 text-amber-300'
                : 'bg-slate-900/60 border-slate-800/80 text-gray-500'"
            >
              <div class="font-bold mb-1 flex items-center gap-1">
                <span>{{ nexusSimulationStep >= idx + 1 ? '✅' : '⏳' }}</span>
                <span>第 {{ idx + 1 }} 阶: {{ stg.title }}</span>
              </div>
              <div class="text-[10px] leading-tight opacity-80">{{ stg.desc }}</div>
            </div>
          </div>

          <!-- 推演日志视窗 -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-gray-300 max-h-48 overflow-y-auto space-y-1">
            <div v-for="(log, idx) in nexusLogs" :key="idx" class="flex items-start gap-2">
              <span class="text-amber-400 select-none">›</span>
              <span :class="log.color || 'text-gray-300'">{{ log.text }}</span>
            </div>
            <div v-if="nexusLogs.length === 0" class="text-gray-600 italic">
              等待启动推演... 点击上方【启动全流程 300 版本大典推演】按键开始推演。
            </div>
          </div>
        </div>

        <!-- Godot 4.6 LTS 3 Tab 源码展台 -->
        <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-slate-800 shadow-xl space-y-4 relative z-10">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="text-cyan-400 font-bold text-sm">💻 Godot 4.6 LTS 全域时空裂隙核心门户实机脚本</span>
              <n-tag type="info" size="tiny" round>RefCounted 核心架构</n-tag>
            </div>
            <div class="flex gap-2">
              <button
                v-for="st in nexusScriptTabs"
                :key="st.key"
                type="button"
                class="px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border"
                :class="activeNexusScriptTab === st.key
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-slate-900 text-gray-400 border-slate-800 hover:text-white'"
                @click="activeNexusScriptTab = st.key"
              >
                {{ st.name }}
              </button>
            </div>
          </div>

          <div class="relative">
            <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed max-h-96">{{ currentNexusScriptCode }}</pre>
            <button
              type="button"
              class="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] text-gray-300 border border-slate-700 cursor-pointer transition-colors"
              @click="copyNexusScript"
            >
              📋 复制代码
            </button>
          </div>
        </div>
      </div>
    </section>


    <!-- 二十大核心子系统与实机推演沙盘全景矩阵导航 -->
    <section class="portal-systems-matrix max-w-7xl mx-auto px-3 sm:px-4 space-y-4">
      <div class="section-header flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              TWENTY CORE SUBSYSTEMS & SANDBOXES
            </span>
            <span class="text-xs text-gray-400">官方实机架构全景导航</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white text-glow-cyan mt-1">
            <span>🏛️</span> 二十大游戏机制沙盘与子系统全矩阵
          </h2>
        </div>
        <router-link to="/vble/docs">
          <n-button size="small" round secondary type="warning">
            <template #icon><span>📜</span></template>
            十六卷架构白皮书
          </n-button>
        </router-link>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        <div
          v-for="sys in allSubsystems"
          :key="sys.path"
          class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-2"
          @click="router.push(sys.path)"
        >
          <div class="flex items-center justify-between">
            <span class="text-2xl group-hover:scale-110 transition-transform">{{ sys.icon }}</span>
            <span class="text-[10px] font-mono text-cyan-400/80">{{ sys.tag }}</span>
          </div>
          <div>
            <div class="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-cyan-300 transition-colors">
              {{ sys.title }}
            </div>
            <div class="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{{ sys.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 全域时空裂隙双月宇宙门户总览、世界线态势雷达与全景航行中枢工坊 (v2.2.343 重磅实装) -->
    <section id="cosmic-navigation-studio" class="max-w-7xl mx-auto px-3 sm:px-4 space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900/95 to-cyan-950/80 border-2 border-indigo-500/40 shadow-[0_0_50px_rgba(99,102,241,0.22)] space-y-6 relative overflow-hidden">
        <div class="absolute -right-24 -top-24 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-24 -bottom-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <!-- 头部与控制栏 -->
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class="px-2.5 py-0.5 rounded text-[11px] font-black font-mono bg-gradient-to-r from-indigo-600 via-cyan-600 to-teal-500 text-white shadow-md animate-pulse">
                v2.2.343 COSMIC PORTAL HUB
              </span>
              <span class="text-xs text-indigo-300 font-mono font-bold">双月宇宙世界线态势与全景航行中枢</span>
            </div>
            <h2 class="text-xl sm:text-3xl font-black text-white flex items-center gap-2 tracking-tight">
              <span>🌌</span> 全域时空裂隙双月宇宙门户总览、世界线态势雷达与全景航行中枢工坊
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl leading-relaxed">
              实时监测 Alpha 原初稳态、Beta 时空坍缩、Gamma 星天升维与 Omega 创世纪四大世界线态势。求解分歧变动率与晶石共鸣通量，规划全域三十维神圣工坊超空间航道，签发 SHA-256 宇宙态势认证证书。
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0 flex-wrap relative z-10">
            <n-button size="small" secondary type="info" @click="resetCosmicStudio">
              <template #icon><span>🔄</span></template>
              重置航行参数
            </n-button>
            <n-button
              size="small"
              type="primary"
              class="bg-gradient-to-r from-indigo-500 to-cyan-500 font-bold text-white shadow-lg shadow-indigo-500/20"
              :loading="simulatingCosmicWarp"
              @click="runSimulatedCosmicWarp"
            >
              <template #icon><span>⚡</span></template>
              执行世界线态势解算与折跃
            </n-button>
          </div>
        </div>

        <!-- 四大宇宙世界线态势预设卡片 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
          <div
            v-for="arch in worldlineArchetypes"
            :key="arch.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
            :class="selectedWorldlineId === arch.id
              ? 'bg-indigo-950/50 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.35)] ring-1 ring-indigo-400/60'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'"
            @click="selectedWorldlineId = arch.id"
          >
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-indigo-500/20">
                  {{ arch.badge }}
                </span>
                <span class="text-xs text-gray-400 font-mono">{{ arch.divergenceCode }}</span>
              </div>
              <div class="text-sm font-bold text-white flex items-center gap-1.5 pt-1">
                <span>{{ arch.icon }}</span>
                <span>{{ arch.name }}</span>
              </div>
              <p class="text-xs text-gray-400 leading-relaxed">{{ arch.desc }}</p>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <span>{{ arch.coreMetricLabel }}</span>
              <span class="text-indigo-400 font-bold">{{ arch.coreMetricVal }}</span>
            </div>
          </div>
        </div>

        <!-- 参数微调滑块与逻辑开关 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/60 p-4 sm:p-6 rounded-xl border border-slate-800/80 relative z-10">
          <!-- 4 滑块 -->
          <div class="lg:col-span-7 space-y-4">
            <div class="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <span>⚙️</span> 多元宇宙因果态势与航行微调参数
            </div>

            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">世界线分歧变动率 (Divergence Rate):</span>
                <span class="font-mono text-indigo-400 font-bold">{{ worldlineDivergenceRate.toFixed(6) }}%</span>
              </div>
              <n-slider v-model:value="worldlineDivergenceRate" :min="0" :max="5" :step="0.001" />
              <div class="flex justify-between text-[10px] text-gray-500">
                <span>0.000% 绝对收敛</span>
                <span>1.048596% 命运门分歧</span>
                <span>5.000% 极性宇宙跃迁</span>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">太古晶石共鸣通量 (Crystal Resonance Flux):</span>
                <span class="font-mono text-indigo-400 font-bold">{{ crystalResonanceFlux }} FLX</span>
              </div>
              <n-slider v-model:value="crystalResonanceFlux" :min="50" :max="500" :step="10" />
              <div class="flex justify-between text-[10px] text-gray-500">
                <span>50 FLX 微光</span>
                <span>320 FLX 宇宙共鸣</span>
                <span>500 FLX 创世激波</span>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">跨位面量子纠缠通信频宽 (Entanglement QPS):</span>
                <span class="font-mono text-indigo-400 font-bold">{{ quantumEntanglementQps }} QPS</span>
              </div>
              <n-slider v-model:value="quantumEntanglementQps" :min="500" :max="10000" :step="100" />
              <div class="flex justify-between text-[10px] text-gray-500">
                <span>500 QPS 稳态握手</span>
                <span>6400 QPS 全息实时同步</span>
                <span>10000 QPS 超光速信道</span>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">时空折跃航行精度 (Navigation Precision):</span>
                <span class="font-mono text-indigo-400 font-bold">{{ chronoWarpPrecision.toFixed(2) }}%</span>
              </div>
              <n-slider v-model:value="chronoWarpPrecision" :min="90" :max="100" :step="0.01" />
              <div class="flex justify-between text-[10px] text-gray-500">
                <span>90.00% 跨界偏移容忍</span>
                <span>99.98% 航天级亚微米对齐</span>
                <span>100.00% 绝对零漂移</span>
              </div>
            </div>
          </div>

          <!-- 3 开关与实时演算看板 -->
          <div class="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <span>🛡️</span> 宇宙因果律与保护断路器
              </div>
              <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div>
                  <div class="text-xs font-bold text-gray-200">锁定原初基准现实锚点</div>
                  <div class="text-[10px] text-gray-500">防止分歧变动率超过临界导致时间悖论</div>
                </div>
                <n-switch v-model:value="anchorPrimeReality" size="small" />
              </div>

              <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div>
                  <div class="text-xs font-bold text-gray-200">实时熵增逆转平抑力场</div>
                  <div class="text-[10px] text-gray-500">吸收虚空侵蚀残余，恢复宇宙稳态秩序</div>
                </div>
                <n-switch v-model:value="realtimeEntropySuppression" size="small" />
              </div>

              <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div>
                  <div class="text-xs font-bold text-gray-200">自动化位面谐振同步协调</div>
                  <div class="text-[10px] text-gray-500">三十维神圣工坊事件总线零延迟联动</div>
                </div>
                <n-switch v-model:value="autoCosmicHarmonization" size="small" />
              </div>
            </div>

            <!-- 4 项实时数学衍生指标 -->
            <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <div class="text-[10px] text-gray-400">因果稳态指数</div>
                <div class="text-base font-black text-indigo-400 font-mono mt-0.5">{{ causalStabilityIndex }}</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <div class="text-[10px] text-gray-400">坍缩预警倒计时</div>
                <div class="text-base font-black text-amber-400 font-mono mt-0.5">{{ collapseWarningCountdown }}</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <div class="text-[10px] text-gray-400">瞬时折跃能级</div>
                <div class="text-base font-black text-cyan-400 font-mono mt-0.5">{{ warpEnergyOutput }}</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <div class="text-[10px] text-gray-400">宇宙繁荣评级</div>
                <div class="text-base font-black text-emerald-400 font-mono mt-0.5">{{ cosmicProsperityRank }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5 阶段流水线演练进度与实时推演控制台 -->
        <div class="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 relative z-10">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>📊</span> 世界线态势解算与全景折跃五阶段流水线
              </span>
              <span v-if="simulatingCosmicWarp" class="text-[10px] font-mono text-cyan-400 animate-pulse">
                [WARP PIPELINE EXECUTING STAGE {{ cosmicWarpStep }}/5]
              </span>
            </div>
            <div class="text-xs text-gray-400 font-mono">
              当前态势: <span class="text-indigo-300 font-bold">{{ activeWorldlineObj?.name }}</span>
            </div>
          </div>

          <n-progress
            type="line"
            :percentage="simulatingCosmicWarp ? cosmicWarpStep * 20 : 100"
            :status="simulatingCosmicWarp ? 'info' : 'success'"
            :color="'#6366f1'"
            :rail-color="'#1e293b'"
            :height="8"
            :show-indicator="false"
            border-radius="4px"
          />

          <div class="h-32 bg-slate-900/90 rounded-lg p-3 font-mono text-xs overflow-y-auto space-y-1 text-gray-300 border border-slate-800/80">
            <div v-for="(log, idx) in cosmicLogs" :key="idx" class="flex items-start gap-2">
              <span class="text-gray-500 shrink-0">[{{ log.time }}]</span>
              <span :class="log.color">{{ log.text }}</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <div class="text-gray-400 font-mono">
              <span>双月宇宙防伪认证证书: </span>
              <span class="text-indigo-400 font-bold">{{ cosmicCertHash }}</span>
            </div>
            <n-button size="tiny" secondary type="info" round @click="exportCosmicCert">
              <template #icon><span>📜</span></template>
              导出宇宙态势与折跃航行报告 (SHA-256)
            </n-button>
          </div>
        </div>

        <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
        <div class="space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800 relative z-10">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                  GODOT 4.6 LTS COSMIC CORE
                </span>
                <span class="text-sm font-bold text-white">宇宙世界线雷达与全景航行总线实机驱动</span>
              </div>
              <p class="text-xs text-gray-400 mt-1">
                提供生产级世界线分歧率解算核心、全域跨系统超空间航行路由与事件调度总线及熵增平抑力场控制器。
              </p>
            </div>
            <div class="flex items-center gap-2">
              <n-button
                v-for="codeTab in cosmicCodeTabs"
                :key="codeTab.id"
                size="tiny"
                round
                :type="activeCosmicCodeTab === codeTab.id ? 'info' : 'default'"
                :secondary="activeCosmicCodeTab !== codeTab.id"
                @click="activeCosmicCodeTab = codeTab.id"
              >
                {{ codeTab.name }}
              </n-button>
              <n-button size="tiny" round secondary type="info" @click="copyActiveCosmicCode">
                <template #icon><span>📋</span></template>
                复制代码
              </n-button>
            </div>
          </div>
          <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto leading-relaxed max-h-[420px]">{{ currentCosmicCode }}</pre>
        </div>
      </div>
    </section>

    <!-- 底部合规标识 -->
    <div class="portal-footer-notice max-w-7xl mx-auto px-3 sm:px-4 pt-6 border-t border-slate-800/80 text-center space-y-2 text-xs text-gray-500">
      <div class="flex items-center justify-center gap-4 text-gray-400">
        <span class="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">CADPA 12+ 适龄提示</span>
        <span>本游戏适合 12 周岁以上的玩家使用</span>
      </div>
      <p class="text-[11px] sm:text-xs">健康游戏忠告：抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。</p>
      <p class="text-gray-600 text-[11px]">最终幻想：时空之轮 (FF Chrono Twilight) · 单机 JRPG 官方网站. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  homeCarouselBanners,
  homeNewsList,
  homeGameModes,
  homeHeroShowcase,
  homeGuideShortcuts
} from '../config/homePortalConfig'
import SocialShareBar from '@/components/SocialShareBar.vue'

import { useMessage } from 'naive-ui'
const message = useMessage()
const router = useRouter()

const newsTabs = [
  { id: 'all', name: '全部' },
  { id: 'notice', name: '版本' },
  { id: 'strategy', name: '攻略' },
  { id: 'news', name: '世界' },
  { id: 'act', name: '特权' }
]

const activeNewsTab = ref('all')

const navigateToMoreNews = () => {
  const catMap: Record<string, string> = {
    notice: 'version',
    strategy: 'strategy',
    news: 'world',
    act: 'privilege'
  }
  const targetCategory = catMap[activeNewsTab.value]
  if (targetCategory) {
    router.push({ path: '/vble/news', query: { category: targetCategory } })
  } else {
    router.push('/vble/news')
  }
}

const headlineNews = computed(() => {
  return homeNewsList.find(n => n.isHot) || homeNewsList[0]
})

const filteredNews = computed(() => {
  if (activeNewsTab.value === 'all') return homeNewsList.slice(0, 6)
  return homeNewsList.filter(n => {
    if (n.type === activeNewsTab.value) return true
    if (activeNewsTab.value === 'notice' && (n.category === 'version' || n.category === 'update')) return true
    if (activeNewsTab.value === 'strategy' && n.category === 'strategy') return true
    if (activeNewsTab.value === 'news' && n.category === 'world') return true
    if (activeNewsTab.value === 'act' && (n.category === 'privilege' || n.category === 'roadmap')) return true
    return false
  }).slice(0, 6)
})

const selectedHeroId = ref('li_chuan')

const activeHero = computed(() => {
  return homeHeroShowcase.find(h => h.id === selectedHeroId.value) || homeHeroShowcase[0]
})

const galleryPreviews = [
  { name: '实机回合制战斗', src: '/images/battle-preview.png' },
  { name: '世界大地图航图', src: '/images/world-map.png' },
  { name: '洞窟火把解谜', src: '/images/cave-explore.png' },
  { name: '魔导雷光粒子', src: '/images/vfx-magitek.png' }
]

const allSubsystems = [
  { title: '十六卷白皮书', icon: '📜', path: '/vble/docs', tag: 'Vol.01~16', desc: '核心规范文库与拓扑' },
  { title: '全地形载具矩阵', icon: '🛸', path: '/vble/vehicles', tag: '10 Vehicles', desc: '海陆空潜巡航模拟器' },
  { title: '十二召唤兽契约', icon: '🐉', path: '/vble/summons', tag: '12 Summons', desc: '合体极意与真实伤害' },
  { title: '世界首领机制', icon: '⚔️', path: '/vble/boss-tactics', tag: '14 Bosses', desc: '神龙海啸与斩铁试炼' },
  { title: '虚空引力场推演', icon: '🌌', path: '/vble/celestial', tag: '9 Planets', desc: '太阳系行星引力场' },
  { title: '宏观经济与调合', icon: '⚗️', path: '/vble/economy', tag: 'Mix Lab', desc: '药剂质变与七色尾巴' },
  { title: '着色粒子画廊', icon: '🖼️', path: '/vble/gallery', tag: 'VFX Shader', desc: '着色器调参与显存预估' },
  { title: '英雄成长六维', icon: '👥', path: '/vble/characters', tag: '8 Heroes', desc: '光暗主角1~99级曲线' },
  { title: '全域倒排索引', icon: '🔍', path: '/vble/search', tag: 'Omni Search', desc: '跨系统模糊关联图谱' },
  { title: '四大纪元规划', icon: '🚀', path: '/vble/roadmap', tag: 'Roadmap', desc: '算力排期推演沙盘' },
  { title: '史诗编年因果', icon: '📖', path: '/vble/story', tag: '30 Chapters', desc: '光暗双线44节拍雷达' },
  { title: '秘传与青魔法', icon: '✨', path: '/vble/teachings', tag: 'Blue Magic', desc: '12青魔受击拟态捕获' },
  { title: 'GM 属性修改器', icon: '🛠️', path: '/vble/modifier', tag: '1~255 Lv', desc: '内存补丁与金手指' },
  { title: '神兵与二刀流', icon: '🗡️', path: '/vble/equipment', tag: 'Ragnarok', desc: '双持8连击乱打工坊' },
  { title: '配装模拟工坊', icon: '🛡️', path: '/vble/armory-simulator', tag: 'Armory', desc: '全职业装备战力沙盘' },
  { title: '底层系统总览', icon: '⚙️', path: '/vble/systems', tag: 'Architecture', desc: '单机架构十维总纲' },
  { title: '97处风土大典', icon: '🗺️', path: '/vble/scenes', tag: '97 Scenes', desc: '北境拓扑与商铺生态' },
  { title: '18大深渊地宫', icon: '🏰', path: '/vble/dungeons', tag: '18 Dungeons', desc: '隐藏密室与机关推演' },
  { title: '147种魔物图鉴', icon: '👾', path: '/vble/monsters', tag: '147 Monsters', desc: '属性弱点与掉落物' },
  { title: '28大职业矩阵', icon: '⚔️', path: '/vble/jobs', tag: '28 Jobs', desc: '双轨进阶与极意被动' }
]

// ==========================================
// 全域时空裂隙核心门户终极枢纽工坊 (v2.2.300)
// ==========================================
interface NexusArchetype {
  id: string
  name: string
  icon: string
  tag: string
  desc: string
  perk: string
  scoreMult: number
}

const nexusArchetypes: NexusArchetype[] = [
  {
    id: 'chrono_convergence',
    name: '始源时空奇点收敛核',
    icon: '🌀',
    tag: '奇点收敛',
    desc: '锚定全域 300+ 版本流脉与时空世界线，以太通量无损穿梭',
    perk: '全域场景秒速无缝跃迁',
    scoreMult: 1.45
  },
  {
    id: 'cross_platform_vulkan',
    name: '多端极速渲染引擎拓扑',
    icon: '🖥️',
    tag: 'Vulkan/Metal',
    desc: '贯通 PC、macOS Metal、Steam Deck 与 WebAssembly 原生零损耗',
    perk: '多端着色器动态零损耗分发',
    scoreMult: 1.35
  },
  {
    id: 'zero_copy_threading',
    name: '零拷贝高并发微线程阵列',
    icon: '⚙️',
    tag: 'WorkerPool',
    desc: '全域物理、音频、剧情脚本与战斗 AI 异步并行无锁交互',
    perk: '微秒级调度吞吐提升 350%',
    scoreMult: 1.40
  },
  {
    id: 'multiverse_creation',
    name: '太古多元宇宙终极创世',
    icon: '🌌',
    tag: '创世神纪',
    desc: '超越凡人极境，缔造永恒光暗平衡始源宇宙，缔造万界神国',
    perk: '全要素调和始源神国终局',
    scoreMult: 1.55
  }
]

const selectedNexusId = ref<string>('chrono_convergence')

// 4 维连续滑块参数
const portalThroughput = ref<number>(3600)
const multiverseEntropy = ref<number>(1.6)
const latencyBudget = ref<number>(4.2)
const aetherResonanceIndex = ref<number>(180)

// 3 大终极保护断路器
const omnipotentCausalityShield = ref<boolean>(true)
const zeroDowntimeHotSwapLock = ref<boolean>(true)
const transcendenceCapBreaker300 = ref<boolean>(true)

const currentNexus = computed(() => {
  return nexusArchetypes.find(a => a.id === selectedNexusId.value) || nexusArchetypes[0]
})

const calculatedNexusScore = computed(() => {
  const baseScore = 48000
  const throughputBonus = Math.round((portalThroughput.value / 100) * 850)
  const resonanceBonus = Math.round((aetherResonanceIndex.value / 100) * 12000)
  const entropyAdjustment = Math.round((5.0 - multiverseEntropy.value) * 1500)
  const shieldBonus = (omnipotentCausalityShield.value ? 6000 : 0) + (zeroDowntimeHotSwapLock.value ? 4500 : 0)
  return Math.round((baseScore + throughputBonus + resonanceBonus + entropyAdjustment + shieldBonus) * currentNexus.value.scoreMult)
})

const calculatedThroughputOps = computed(() => {
  const baseOps = portalThroughput.value
  const multFactor = zeroDowntimeHotSwapLock.value ? 1.45 : 1.0
  return Math.round(baseOps * multFactor)
})

const calculatedHealthSafety = computed(() => {
  let health = 88.0
  health += (aetherResonanceIndex.value / 200) * 6.5
  health += omnipotentCausalityShield.value ? 3.5 : 0
  health += zeroDowntimeHotSwapLock.value ? 2.0 : 0
  if (latencyBudget.value > 12.0) health -= 4.0
  return Math.min(99.9, Math.max(70.0, health))
})

const milestoneRankTier = computed(() => {
  if (calculatedNexusScore.value >= 100000 && calculatedHealthSafety.value >= 98.0) return 'Ω-MAX 太古始源全知神祇级'
  if (calculatedNexusScore.value >= 80000) return 'Ω-1 完备大收敛宗师级'
  if (calculatedNexusScore.value >= 60000) return 'Ω-2 稳定时空拓扑先驱'
  return 'Ω-3 标准单机架构'
})

const resetNexusParameters = () => {
  portalThroughput.value = 3600
  multiverseEntropy.value = 1.6
  latencyBudget.value = 4.2
  aetherResonanceIndex.value = 180
  omnipotentCausalityShield.value = true
  zeroDowntimeHotSwapLock.value = true
  transcendenceCapBreaker300.value = true
  message?.info('全域枢纽参数已重置为黄金标准配置')
}

// 五阶段仿真推演
const isSimulatingNexus = ref<boolean>(false)
const nexusSimulationStep = ref<number>(0)
interface NexusLogItem {
  text: string
  color?: string
}
const nexusLogs = ref<NexusLogItem[]>([])

const nexusStages = [
  { id: 1, title: '全域300版本流脉扫描', desc: '检索30大子系统拓扑与全息依赖' },
  { id: 2, title: '因果护盾与热插拔就绪', desc: '启动零停机热重载与防坍缩护盾' },
  { id: 3, title: '零拷贝跨线程调度注能', desc: '微秒级WorkerPool并发管线贯通' },
  { id: 4, title: '以太共鸣多元大收敛', desc: '多元宇宙创世神纪全维调和' },
  { id: 5, title: '300版本里程碑大典达成', desc: '颁发终极太古神圣认证方案书' }
]

const runNexusSimulation = async () => {
  if (isSimulatingNexus.value) return
  isSimulatingNexus.value = true
  nexusSimulationStep.value = 0
  nexusLogs.value = []

  const appendLog = (text: string, color?: string) => {
    nexusLogs.value.push({ text, color })
  }

  appendLog('[INIT] 启动全域时空裂隙核心门户 v2.2.300 里程碑大典推演...', 'text-amber-400 font-bold')
  await new Promise(r => setTimeout(r, 400))

  // Step 1
  nexusSimulationStep.value = 1
  appendLog(`[STEP 1] 扫描全域 28 大核心门户视窗与 300 个发布记录，枢纽选定【${currentNexus.value.name}】。`, 'text-cyan-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 2
  nexusSimulationStep.value = 2
  appendLog(`[STEP 2] 激活因果律防坍缩护盾: ${omnipotentCausalityShield.value ? '已就绪' : '未开启'}；零停机热插拔锁: ${zeroDowntimeHotSwapLock.value ? '已锁定' : '未开启'}。`, 'text-purple-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 3
  nexusSimulationStep.value = 3
  appendLog(`[STEP 3] 启动 WorkerThreadPool 零拷贝微线程！并发吞吐达 ${calculatedThroughputOps.value.toLocaleString()} OPS，帧时延 ${latencyBudget.value.toFixed(1)} ms！`, 'text-rose-400 font-bold')
  await new Promise(r => setTimeout(r, 500))

  // Step 4
  nexusSimulationStep.value = 4
  appendLog(`[STEP 4] 以太共鸣相干率 ${aetherResonanceIndex.value}%，破限神印解除所有数值枷锁，全域综合能效 ${calculatedNexusScore.value.toLocaleString()} 分！`, 'text-emerald-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 5
  nexusSimulationStep.value = 5
  appendLog(`[SUCCESS] v2.2.300 终极里程碑大典圆满达成！认证位阶: 【${milestoneRankTier.value}】，太古创世永恒立碑！`, 'text-amber-300 font-bold')
  isSimulatingNexus.value = false
  message?.success('v2.2.300 里程碑大典推演圆满成功！')
}

const exportNexusCertificate = () => {
  const certData = {
    studio: 'Omni Spacetime Rift Portal & Ultimate Primal Nexus Studio v2.2.300',
    milestone: 'v2.2.300 Official Jubilee Release',
    nexusArchetype: currentNexus.value.name,
    portalThroughput: portalThroughput.value,
    multiverseEntropy: multiverseEntropy.value,
    latencyBudget: latencyBudget.value,
    aetherResonanceIndex: aetherResonanceIndex.value,
    calculatedNexusScore: calculatedNexusScore.value,
    calculatedThroughputOps: calculatedThroughputOps.value,
    calculatedHealthSafety: calculatedHealthSafety.value,
    milestoneRankTier: milestoneRankTier.value,
    timestamp: new Date().toISOString(),
    sha256Certificate: 'NEXUS-V300-JUBILEE-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(16).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `v300_jubilee_certificate_${certData.sha256Certificate}.json`
  a.click()
  URL.revokeObjectURL(url)
  message?.success(`已导出 300 版本大典方案证书: ${certData.sha256Certificate}`)
}

// 源码展台
type NexusScriptKey = 'hub_engine' | 'genesis_orchestrator' | 'circuit_breaker'

const activeNexusScriptTab = ref<NexusScriptKey>('hub_engine')

const nexusScriptTabs = [
  { key: 'hub_engine' as const, name: '核心门户枢纽引擎' },
  { key: 'genesis_orchestrator' as const, name: '创世全息编排器' },
  { key: 'circuit_breaker' as const, name: '零拷贝断路器' }
]

const nexusScriptCodes: Record<NexusScriptKey, string> = {
  hub_engine: `class_name OmniNexusSpacetimeHubEngine
extends RefCounted

## 最终幻想：时空之轮 - 全域时空裂隙核心门户枢纽引擎
## 文件路径: res://scripts/core/omni_nexus_spacetime_hub_engine.gd
## 引擎版本: Godot Engine 4.6 LTS

signal milestone_reached(version: String, score: int)
signal throughput_updated(ops_per_second: int)

var throughput_ops: int = 3600
var latency_budget_ms: float = 4.2
var causality_shield_active: bool = true

func evaluate_hub_performance(resonance_ratio: float) -> Dictionary:
    var effective_ops: int = int(float(throughput_ops) * (1.0 + resonance_ratio * 0.45))
    var efficiency_score: int = int(float(effective_ops) * 12.8)
    throughput_updated.emit(effective_ops)

    var outcome := {
        "version": "v2.2.300",
        "effective_ops": effective_ops,
        "efficiency_score": efficiency_score,
        "rank": "OMEGA_MAX_GENESIS" if efficiency_score > 80000 else "OMEGA_STANDARD",
        "timestamp": Time.get_datetime_string_from_system()
    }
    milestone_reached.emit("v2.2.300", efficiency_score)
    return outcome
`,

  genesis_orchestrator: `class_name MultiverseGenesisOrchestrator
extends RefCounted

## 最终幻想：时空之轮 - 多元宇宙创世全息编排器
## 文件路径: res://scripts/core/multiverse_genesis_orchestrator.gd
## 引擎版本: Godot Engine 4.6 LTS

static func synthesize_multiverse_state(entropy: float, resonance: float) -> Dictionary:
    var balance_index: float = (5.0 - entropy) / 5.0 * 0.5 + (resonance / 200.0) * 0.5
    var is_perfect_balance: bool = balance_index >= 0.90

    return {
        "balance_index": clampf(balance_index, 0.0, 1.0),
        "is_perfect_balance": is_perfect_balance,
        "prosperity_years": 1000000 if is_perfect_balance else 50000,
        "cosmic_regime": "PRIMAL_CREATION_FEDERATION"
    }
`,

  circuit_breaker: `class_name ZeroCopyOmnipotentCircuitBreaker
extends RefCounted

## 最终幻想：时空之轮 - 零拷贝全息断路器与热插拔守卫
## 文件路径: res://scripts/core/zero_copy_omnipotent_circuit_breaker.gd
## 引擎版本: Godot Engine 4.6 LTS

static func handle_hot_swap(component_name: String, has_lock: bool) -> Dictionary:
    return {
        "component": component_name,
        "hot_swap_success": true,
        "zero_downtime": has_lock,
        "packet_loss_percent": 0.0 if has_lock else 0.02
    }
`
}

const currentNexusScriptCode = computed(() => {
  return nexusScriptCodes[activeNexusScriptTab.value]
})

const copyNexusScript = () => {
  navigator.clipboard.writeText(currentNexusScriptCode.value)
  message?.success('已复制 Godot 4.6 LTS 脚本源码到剪贴板！')
}

// ==========================================
// v2.2.343: 全域时空裂隙双月宇宙门户总览与全景航行中枢工坊
// ==========================================
interface WorldlineArchetype {
  id: 'alpha_prime_origin' | 'beta_chrono_collapse' | 'gamma_astral_ascend' | 'omega_void_genesis'
  name: string
  badge: string
  divergenceCode: string
  icon: string
  desc: string
  coreMetricLabel: string
  coreMetricVal: string
}

const worldlineArchetypes: WorldlineArchetype[] = [
  {
    id: 'alpha_prime_origin',
    name: 'Alpha 原初稳态世界线',
    badge: 'STEADY TIMELINE',
    divergenceCode: 'λ: 0.000000%',
    icon: '🌍',
    desc: '水晶共振度 99.8%、裂隙坍缩率 0.02%、第一世界至第三世界拓扑完全对齐、秩序神格处于全息护佑。',
    coreMetricLabel: '因果完整度',
    coreMetricVal: '99.98%'
  },
  {
    id: 'beta_chrono_collapse',
    name: 'Beta 时空坍缩分歧世界线',
    badge: 'VOID DIVERGENCE',
    divergenceCode: 'λ: 1.048596%',
    icon: '⚡',
    desc: '虚空引力暴涨 450%、终焉双月重叠潮汐、大地图地下城异化、全域首领狂暴攻坚机制全开。',
    coreMetricLabel: '虚空侵蚀率',
    coreMetricVal: '45.20%'
  },
  {
    id: 'gamma_astral_ascend',
    name: 'Gamma 星天维度升维世界线',
    badge: 'ASTRAL ASCEND',
    divergenceCode: 'λ: 2.718281%',
    icon: '✨',
    desc: '黑洞弹弓引力穿梭、超光速折跃跳跃、太古奥术元素链超载反应、三十全职业被动技能破限融合。',
    coreMetricLabel: '维度跃迁能级',
    coreMetricVal: '10^18 J'
  },
  {
    id: 'omega_void_genesis',
    name: 'Omega 终焉虚空创世纪世界线',
    badge: 'GENESIS REBIRTH',
    divergenceCode: 'λ: 3.141592%',
    icon: '🌌',
    desc: '宇宙重构协议激活、跨纪元资产与记忆守恒迁移、全域三十维神圣工坊全息共鸣、创世终极态。',
    coreMetricLabel: '创世因果率',
    coreMetricVal: '100.00%'
  }
]

const selectedWorldlineId = ref<'alpha_prime_origin' | 'beta_chrono_collapse' | 'gamma_astral_ascend' | 'omega_void_genesis'>('alpha_prime_origin')
const worldlineDivergenceRate = ref(1.048596)
const crystalResonanceFlux = ref(320)
const quantumEntanglementQps = ref(6400)
const chronoWarpPrecision = ref(99.98)

const anchorPrimeReality = ref(true)
const realtimeEntropySuppression = ref(true)
const autoCosmicHarmonization = ref(true)

const activeWorldlineObj = computed(() => {
  return worldlineArchetypes.find(w => w.id === selectedWorldlineId.value) || worldlineArchetypes[0]
})

const causalStabilityIndex = computed(() => {
  let stab = 99.0 + (chronoWarpPrecision.value - 90) * 0.09
  if (anchorPrimeReality.value) stab += 0.05
  if (realtimeEntropySuppression.value) stab += 0.04
  return `${Math.min(99.999, stab).toFixed(3)}%`
})

const collapseWarningCountdown = computed(() => {
  const baseSec = Math.round(124500 * (crystalResonanceFlux.value / 300) / Math.max(0.1, worldlineDivergenceRate.value))
  return `${baseSec.toLocaleString()} 纪元秒`
})

const warpEnergyOutput = computed(() => {
  const energy = (crystalResonanceFlux.value * 0.028) * (quantumEntanglementQps.value / 5000)
  return `${energy.toFixed(2)} × 10¹⁸ J`
})

const cosmicProsperityRank = computed(() => {
  if (chronoWarpPrecision.value >= 99.9 && crystalResonanceFlux.value >= 300) {
    return 'EX·太古永恒秩序'
  } else if (chronoWarpPrecision.value >= 98.0) {
    return 'S·高维繁荣纪元'
  }
  return 'A·平稳世界线'
})

const simulatingCosmicWarp = ref(false)
const cosmicWarpStep = ref(0)
const cosmicCertHash = ref('COSMIC-SHA256-8A3E91B2F04C')

const cosmicLogs = ref<Array<{ time: string; text: string; color: string }>>([
  { time: 'INIT', text: '双月宇宙全景世界线雷达已上线，量子纠缠链路畅通。', color: 'text-indigo-400' },
  { time: 'STANDBY', text: '原初世界线锚点已锁定，三十维神圣工坊全息事件总线待命中。', color: 'text-gray-400' }
])

const resetCosmicStudio = () => {
  selectedWorldlineId.value = 'alpha_prime_origin'
  worldlineDivergenceRate.value = 1.048596
  crystalResonanceFlux.value = 320
  quantumEntanglementQps.value = 6400
  chronoWarpPrecision.value = 99.98
  anchorPrimeReality.value = true
  realtimeEntropySuppression.value = true
  autoCosmicHarmonization.value = true
  cosmicCertHash.value = 'COSMIC-SHA256-8A3E91B2F04C'
  cosmicLogs.value = [
    { time: 'RESET', text: '双月宇宙航行中枢已恢复初始稳态世界线。', color: 'text-amber-400' },
    { time: 'READY', text: '时空折跃航线已对齐原初 Alpha 纪元基准坐标。', color: 'text-indigo-400' }
  ]
  message?.success('双月宇宙航行参数已重置！')
}

const runSimulatedCosmicWarp = () => {
  if (simulatingCosmicWarp.value) return
  simulatingCosmicWarp.value = true
  cosmicWarpStep.value = 1
  cosmicLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    text: `[Stage 1/5] 扫描双月公转坐标与时空裂隙偏角 (分歧率: ${worldlineDivergenceRate.value.toFixed(6)}%)...`,
    color: 'text-indigo-300'
  })

  setTimeout(() => {
    cosmicWarpStep.value = 2
    cosmicLogs.value.unshift({
      time: new Date().toLocaleTimeString(),
      text: `[Stage 2/5] 求解世界线多维张量因果流 (晶石通量: ${crystalResonanceFlux.value} FLX, 频宽: ${quantumEntanglementQps.value} QPS)...`,
      color: 'text-cyan-300'
    })
  }, 400)

  setTimeout(() => {
    cosmicWarpStep.value = 3
    cosmicLogs.value.unshift({
      time: new Date().toLocaleTimeString(),
      text: `[Stage 3/5] 注入反引力谐振波 (熵增平抑: ${realtimeEntropySuppression.value ? '已激活' : '旁路'}, 锚点锁定: ${anchorPrimeReality.value ? 'OK' : 'OFF'})...`,
      color: 'text-indigo-400'
    })
  }, 800)

  setTimeout(() => {
    cosmicWarpStep.value = 4
    cosmicLogs.value.unshift({
      time: new Date().toLocaleTimeString(),
      text: `[Stage 4/5] 规划全域 30 个系统超空间折跃航道 (折跃能级: ${warpEnergyOutput.value}, 精度: ${chronoWarpPrecision.value.toFixed(2)}%)...`,
      color: 'text-teal-300'
    })
  }, 1200)

  setTimeout(() => {
    cosmicWarpStep.value = 5
    const hash = 'COSMIC-SHA256-' + Math.random().toString(16).substring(2, 10).toUpperCase() + Math.random().toString(16).substring(2, 6).toUpperCase()
    cosmicCertHash.value = hash
    cosmicLogs.value.unshift({
      time: new Date().toLocaleTimeString(),
      text: `[Stage 5/5] 折跃航行圆满就绪！颁发宇宙态势认证凭证: ${hash}，繁荣评级: ${cosmicProsperityRank.value}！`,
      color: 'text-emerald-400 font-bold'
    })
    simulatingCosmicWarp.value = false
    message?.success(`双月宇宙全景折跃就绪！凭证: ${hash}`)
  }, 1600)
}

const exportCosmicCert = () => {
  const content = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   双月宇宙门户总览、世界线态势与全景航行报告 (v2.2.343)
================================================================================
报告编号: ${cosmicCertHash.value}
生成时间: ${new Date().toISOString()}
当前世界线: ${activeWorldlineObj.value.name} (${activeWorldlineObj.value.badge})
分歧变动代码: ${activeWorldlineObj.value.divergenceCode}

【宇宙态势与因果调控指标】
- 世界线分歧变动率: ${worldlineDivergenceRate.value.toFixed(6)}%
- 太古晶石共鸣通量: ${crystalResonanceFlux.value} FLX
- 跨位面量子纠缠通信频宽: ${quantumEntanglementQps.value} QPS
- 时空折跃航行精度: ${chronoWarpPrecision.value.toFixed(2)}%
- 因果稳态指数: ${causalStabilityIndex.value}
- 坍缩预警倒计时: ${collapseWarningCountdown.value}
- 瞬时时空折跃能级: ${warpEnergyOutput.value}
- 多元宇宙繁荣评级: ${cosmicProsperityRank.value}

【因果律与保护断路器】
- 锁定原初基准现实锚点: ${anchorPrimeReality.value ? '启用' : '禁用'}
- 实时熵增逆转平抑力场: ${realtimeEntropySuppression.value ? '启用' : '禁用'}
- 自动化位面谐振同步协调: ${autoCosmicHarmonization.value ? '启用' : '禁用'}

【底层实机驱动】
- cosmic_worldline_radar_solver.gd
- spatiotemporal_navigation_bus.gd
- entropy_suppression_field_governor.gd
================================================================================`

  navigator.clipboard.writeText(content).then(() => {
    message?.success('全景宇宙态势与折跃航行报告已复制到剪贴板！')
  }).catch(() => {
    message?.info('报告已复制')
  })
}

const cosmicCodeTabs = [
  { id: 'radar', name: 'cosmic_worldline_radar_solver.gd' },
  { id: 'nav_bus', name: 'spatiotemporal_navigation_bus.gd' },
  { id: 'governor', name: 'entropy_suppression_field_governor.gd' }
] as const

type CosmicCodeTabType = (typeof cosmicCodeTabs)[number]['id']
const activeCosmicCodeTab = ref<CosmicCodeTabType>('radar')

const cosmicSourceCodes: Record<CosmicCodeTabType, string> = {
  radar: `## cosmic_worldline_radar_solver.gd
## 《光之战士：时空裂隙》世界线分歧率计算器与宇宙态势解算核心
## 架构版本: Godot 4.6 LTS / Cosmic Navigation Subsystem

class_name CosmicWorldlineRadarSolver
extends RefCounted

signal divergence_calculated(divergence_rate: float, stability: float, status: String)
signal timeline_divergence_alert(worldline_id: String, drift_percent: float)

var _base_divergence: float = 1.048596
var _crystal_flux: float = 320.0

func _init(base_div: float = 1.048596, flux: float = 320.0) -> void:
	_base_divergence = base_div
	_crystal_flux = flux

## 实时解算当前世界线因果稳态指数
func solve_timeline_status(active_worldline: String, precision: float) -> Dictionary:
	var stability: float = clampf(0.99 + (precision - 90.0) * 0.0009, 0.90, 0.99999)
	var is_stable := stability >= 0.995
	var status_str := "PRIME_STEADY" if is_stable else "VOID_DIVERGENT"

	divergence_calculated.emit(_base_divergence, stability, status_str)
	if not is_stable:
		timeline_divergence_alert.emit(active_worldline, _base_divergence)

	return {
		"worldline": active_worldline,
		"divergence_rate": _base_divergence,
		"causal_stability": stability,
		"status": status_str,
		"timestamp": Time.get_datetime_string_from_system()
	}
`,
  nav_bus: `## spatiotemporal_navigation_bus.gd
## 《光之战士：时空裂隙》全域跨系统超空间航行路由与事件调度总线
## 架构版本: Godot 4.6 LTS / Spatiotemporal Bus Subsystem

class_name SpatiotemporalNavigationBus
extends RefCounted

signal system_route_dispatched(target_system: String, latency_ms: float)
signal warp_jump_completed(origin_plane: String, destination_plane: String)

var _routing_table: Dictionary = {}
var _qps_capacity: int = 6400

func _init(qps: int = 6400) -> void:
	_qps_capacity = qps

## 注册全域 30 维核心工坊子系统路由
func register_system_endpoint(system_id: String, endpoint_path: String) -> void:
	_routing_table[system_id] = endpoint_path

## 执行零拷贝超空间折跃指令
func dispatch_warp_route(target_id: String) -> bool:
	if not _routing_table.has(target_id):
		push_warning("[Cosmic Nav] 目标系统未注册: %s" % target_id)
		return false

	var latency := randf_range(0.08, 0.45)
	system_route_dispatched.emit(target_id, latency)
	warp_jump_completed.emit("PRIME_HUB", target_id)
	return true
`,
  governor: `## entropy_suppression_field_governor.gd
## 《光之战士：时空裂隙》虚空坍缩平抑力场与因果律保护控制器
## 架构版本: Godot 4.6 LTS / Entropy Governor Subsystem

class_name EntropySuppressionFieldGovernor
extends RefCounted

signal field_inverted(resonance_flux: float, suppressed_entropy: float)
signal causality_anchor_locked(anchor_id: String)

var _anchor_locked: bool = true
var _entropy_inverted: bool = true

func _init(lock_anchor: bool = true, invert_entropy: bool = true) -> void:
	_anchor_locked = lock_anchor
	_entropy_inverted = invert_entropy

## 激活反引力谐振平抑力场，抵御虚空侵蚀
func activate_suppression_barrier(flux: float) -> Dictionary:
	var neutralized_entropy := flux * 1.618
	field_inverted.emit(flux, neutralized_entropy)

	if _anchor_locked:
		causality_anchor_locked.emit("ALPHA_ORIGIN_TIMELINE_CORE")

	return {
		"barrier_active": true,
		"neutralized_entropy": neutralized_entropy,
		"anchor_steady": _anchor_locked
	}
`
}

const currentCosmicCode = computed(() => {
  return cosmicSourceCodes[activeCosmicCodeTab.value] || ''
})

const copyActiveCosmicCode = () => {
  navigator.clipboard.writeText(currentCosmicCode.value).then(() => {
    message?.success(`${activeCosmicCodeTab.value}.gd 源码已复制到剪贴板！`)
  }).catch(() => {
    message?.info('源码已复制')
  })
}

</script>
