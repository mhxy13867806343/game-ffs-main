<template>
  <div class="home-portal space-y-8 md:space-y-10">
    <!-- 顶部单机发布广播条 -->
    <div class="portal-marquee flex items-center justify-between px-3 md:px-4 py-2 bg-gradient-to-r from-amber-950/40 via-purple-950/50 to-cyan-950/40 border-y border-amber-500/20 text-xs">
      <div class="flex items-center gap-2 overflow-hidden">
        <span class="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] md:text-[11px] animate-pulse flex-shrink-0">RELEASE</span>
        <span class="text-amber-300 font-semibold flex-shrink-0">【单机正式版】</span>
        <span class="text-gray-300 truncate text-[11px] md:text-xs">
          【最新发布】主线目标全域追踪与居民雷达标记系统上线！王城高阶Rank A/S悬赏解禁，双月宇宙无需网络即启征程！
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
              <p class="text-[11px] text-gray-400 mt-1">版本 v2.2.0 · 离线单机桌面运行端</p>
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
                  <div class="text-[10px] text-gray-400">v2.2.0动态</div>
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
</script>
