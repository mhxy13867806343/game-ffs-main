<template>
  <div class="roadmap-view max-w-6xl mx-auto space-y-8 px-3 sm:px-6 py-4">
    <!-- 顶部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900/80 to-purple-950/60 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden">
      <div class="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              FEATURE ROADMAP & PLANS
            </span>
            <span class="text-xs text-gray-400">持续规划与演进</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🚀</span> 后面要加的功能规划
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            展示后续开发路线图中即将上线、正在筹备与玩家期望加入的核心玩法、前沿系统与视觉特性，每一项均可点击查看详情与参与心愿标记。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <router-link to="/vble/updates">
            <n-button type="info" size="medium" round secondary class="shadow-md">
              <template #icon><span>🔄</span></template>
              查看最新更新日志
            </n-button>
          </router-link>
          <router-link to="/vble">
            <n-button size="medium" round tertiary>
              返回首页
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 规划看板概览指标卡 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">已实装交付</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">{{ getStatusCount('completed') }} 项</div>
        <div class="text-[10px] text-gray-500 mt-0.5">最新版本核心成果</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">正在攻坚中</div>
        <div class="text-2xl font-black text-amber-400 font-mono mt-1">{{ getStatusCount('in_progress') }} 项</div>
        <div class="text-[10px] text-gray-500 mt-0.5">高优先级排期推进</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">已列入规划</div>
        <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ getStatusCount('planned') }} 项</div>
        <div class="text-[10px] text-gray-500 mt-0.5">次级版本规划库</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">累计心愿点赞</div>
        <div class="text-2xl font-black text-pink-400 font-mono mt-1">{{ totalVotes }} 次</div>
        <div class="text-[10px] text-gray-500 mt-0.5">社区交互热度统计</div>
      </div>
    </div>

    <!-- 状态筛选器 (高对比度夜间清晰优化) -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        v-for="status in statusList"
        :key="status.key"
        type="button"
        class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 whitespace-nowrap select-none"
        :class="activeStatus === status.key
          ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-[0_0_12px_rgba(245,158,11,0.45)]'
          : 'bg-slate-800 text-gray-200 border-slate-700 hover:(bg-slate-700 text-white border-slate-500)'"
        @click="activeStatus = status.key"
      >
        <span>{{ status.icon }}</span>
        <span>{{ status.label }}</span>
        <span
          class="text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold"
          :class="activeStatus === status.key ? 'bg-amber-900/30 text-slate-950' : 'bg-slate-900 text-amber-300 border border-slate-700'"
        >
          {{ getStatusCount(status.key) }}
        </span>
      </button>
    </div>

    <!-- 规划功能卡片流 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      <div
        v-for="feature in filteredFeatures"
        :key="feature.id"
        class="feature-card p-5 sm:p-6 rounded-2xl bg-[#121626]/90 border border-slate-800 hover:border-slate-700 shadow-xl transition-all flex flex-col justify-between space-y-4"
      >
        <div class="space-y-3">
          <!-- 顶部状态与标签 -->
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ feature.icon }}</span>
              <h3 class="text-base sm:text-lg font-bold text-white">{{ feature.title }}</h3>
            </div>
            <n-tag size="small" :type="feature.statusType" round strong>
              {{ feature.statusLabel }}
            </n-tag>
          </div>

          <!-- 描述 -->
          <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
            {{ feature.description }}
          </p>

          <!-- 计划包含的核心内容 -->
          <div class="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-1.5">
            <div class="text-xs font-bold text-amber-300 flex items-center gap-1">
              <span>🎯</span> 期望交付特性：
            </div>
            <ul class="text-xs text-gray-300 space-y-1">
              <li v-for="(spec, i) in feature.specs" :key="i" class="flex items-start gap-1.5">
                <span class="text-amber-400 font-bold shrink-0">✔</span>
                <span>{{ spec }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 底部预定版本与点赞交互 -->
        <div class="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
          <div class="flex items-center gap-2">
            <span class="text-gray-500">预定目标：</span>
            <span class="font-mono text-cyan-300 font-bold">{{ feature.targetVersion }}</span>
          </div>

          <!-- 点赞/想要这个功能按钮 -->
          <n-button
            size="small"
            round
            :type="feature.voted ? 'warning' : 'default'"
            :secondary="!feature.voted"
            @click="toggleVote(feature)"
          >
            <template #icon>
              <span>{{ feature.voted ? '❤️' : '🤍' }}</span>
            </template>
            <span>想要这个 ({{ feature.votes }})</span>
          </n-button>
        </div>
      </div>
    </div>

    <!-- 底部提需求鼓励条 -->
    <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900/60 border border-purple-500/20 text-center space-y-2">
      <div class="text-base font-bold text-white flex items-center justify-center gap-1.5">
        <span>💡</span> 想看到更多心仪的游戏机制或新功能？
      </div>
      <p class="text-xs text-gray-400 max-w-xl mx-auto">
        本页面持续收纳所有玩家与架构师的构想，随时向我们反馈您最想要的玩法或页面，我们将优先纳入下一轮排期！
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeStatus = ref('all')

const statusList = [
  { key: 'all', label: '全部规划', icon: '📋' },
  { key: 'completed', label: '已实装交付', icon: '✅' },
  { key: 'in_progress', label: '攻坚中', icon: '🚧' },
  { key: 'planned', label: '规划中', icon: '📅' },
  { key: 'proposal', label: '期望心愿', icon: '💡' }
]

interface FeaturePlan {
  id: string
  title: string
  icon: string
  status: 'completed' | 'in_progress' | 'planned' | 'proposal'
  statusLabel: string
  statusType: 'warning' | 'info' | 'success' | 'default'
  targetVersion: string
  description: string
  specs: string[]
  votes: number
  voted: boolean
}

const features = ref<FeaturePlan[]>([
  {
    id: 'feat-main-story-resident-tracker',
    title: '主线全域目标追踪与真实居民雷达标记系统',
    icon: '🧭',
    status: 'completed',
    statusLabel: '已实装交付',
    statusType: 'success',
    targetVersion: 'v2.2.165',
    description: '主线全章节44个节拍目标与大地图HUD雷达全域打通，接入单宿主真实居民弱引用登记架构，支持对白、转场等多维门禁状态下的纯读安全投影。',
    specs: [
      '主线 44 个节拍任务方位 HUD 与地图 Marker 实时联动',
      'ResidentSourceRegistry 单宿主弱引用生命周期管理与墓碑判定',
      '过场、对白锁、菜单与机关覆盖下纯读阻断与自动恢复'
    ],
    votes: 168,
    voted: true
  },
  {
    id: 'feat-high-tier-bounties-a-s',
    title: '酒馆高阶看板 Rank A 强化奇美拉与通关专属 Rank S 死神之眼',
    icon: '⚔️',
    status: 'completed',
    statusLabel: '已实装交付',
    statusType: 'success',
    targetVersion: 'v2.2.164',
    description: '晨辉王城酒馆看板高阶契约全面开放，涵盖强化奇美拉与周目通关专属死神之眼，耐火斗篷、护盾指环、钻石胸甲与盗贼小手神装领赏。',
    specs: [
      'Rank A 混沌神殿专属点位强化奇美拉，奖励耐火斗篷+护盾指环+35000G',
      'Rank S 周目通关限定死神之眼，奖励钻石胸甲+盗贼小手+100000G',
      '周目重置悬赏进度防坏档保障，三项奖励容量一致性领赏'
    ],
    votes: 142,
    voted: true
  },
  {
    id: 'feat-battle-cutin',
    title: '战术大招技能动画与特写 Cut-in 演出',
    icon: '⚔️',
    status: 'in_progress',
    statusLabel: '正在攻坚',
    statusType: 'warning',
    targetVersion: 'v2.3.0',
    description: '为九阶禁断魔法（核爆 Flare、陨石 Meteor、终极神圣 Holy）以及各职业招牌极意技能（二刀流乱打、龙王破灭击、居合一刀两断）设计华丽的全屏粒子与角色特写 Cut-in 视效。',
    specs: [
      '高帧率 2D 骨骼像素与高精度粒子着色器混合管线',
      '终结技释放瞬间时空凝滞与多维震屏摄像机',
      '可在游戏设置中随心开启或一键跳过特写演出'
    ],
    votes: 89,
    voted: false
  },
  {
    id: 'feat-cloud-save',
    title: '云端存档多端同步与防丢校验',
    icon: '☁️',
    status: 'in_progress',
    statusLabel: '正在攻坚',
    statusType: 'warning',
    targetVersion: 'v2.3.0',
    description: '打破桌面离线端与 Web 门户端界限，支持通过一键导出/导入存档文件或私有云同步，使玩家在浏览器配装模拟器中无缝载入自己在游戏中的真实队伍数据。',
    specs: [
      '标准 JSON / 加密二进制双向存档导入导出器',
      '多周目通关星标 (Clear Star) 与二周目继承防坏档校验',
      '在线配装模拟器一键读取实机存档角色战力'
    ],
    votes: 114,
    voted: false
  },
  {
    id: 'feat-alchemy-craft',
    title: '神兵炼金工坊与太古符文附魔',
    icon: '⚗️',
    status: 'in_progress',
    statusLabel: '正在攻坚',
    statusType: 'warning',
    targetVersion: 'v2.3.5',
    description: '在封印之城库扎与矮人深渊熔炉设立神兵炼金台，利用收集到的古代以太精金与七色尾巴，对 11 件太古封印神兵进行二次开光与符文孔位镶嵌。',
    specs: [
      '支持洗练武器词条：暴击倍率、吸血转化率、攻击附伤属性',
      '镶嵌古代圣遗物符石解锁第二专属被动特技',
      '零损耗回退与强化保底防碎机制'
    ],
    votes: 76,
    voted: false
  },
  {
    id: 'feat-abyss-tower',
    title: '50~100 层深渊地狱极限挑战',
    icon: '🏰',
    status: 'planned',
    statusLabel: '已列入规划',
    statusType: 'info',
    targetVersion: 'v2.4.0',
    description: '在现有 49 层深渊竞技场的基础上，向下突破至非之世界地底 100 层绝境挑战。每 10 层引入变异首领与随机环境词缀（如禁魔领域、急速狂暴、荆棘反震）。',
    specs: [
      '新增隐藏最终极 BOSS【虚无真祖 · 混沌龙神】',
      '通关产出全职业通用的究极无双自选神器神饰',
      '附带战斗伤害统计报表与生存轮次排行榜'
    ],
    votes: 62,
    voted: false
  },
  {
    id: 'feat-bonds-story',
    title: '主角营地篝火与专属羁绊物语',
    icon: '⛺',
    status: 'planned',
    statusLabel: '已列入规划',
    statusType: 'info',
    targetVersion: 'v2.4.0',
    description: '在野外搭建野营帐篷或小木屋休整时，触发队伍 8 位主角之间的专属对话剧情与心路历程，提升伙伴羁绊等级。',
    specs: [
      '光暗双队领袖（索尔与纳哈特）跨越立场的理念碰撞小剧场',
      '羁绊满级后解锁双人合体技（如圣光烈斩、暗影治愈）',
      '解锁各角色宿命纪念立绘与专属旅途回忆记录'
    ],
    votes: 95,
    voted: false
  },
  {
    id: 'feat-exploration-master',
    title: '全域 97 图探索 100% 收集成就与专属坐骑',
    icon: '🏆',
    status: 'planned',
    statusLabel: '已列入规划',
    statusType: 'info',
    targetVersion: 'v2.4.5',
    description: '为 97 处全域探索大地图与 57 篇官方风土志建立进度追踪体系，探明所有隐藏门、宝箱密室与学者答题即可加冕全域探索大师。',
    specs: [
      '全图全收集专属勋章与成就陈列室页面',
      '获得全地形飞跃型黄金陆行鸟与水下畅游海豚坐骑',
      '达成全风土记录解锁《大陆全典》实体装订典藏版封面'
    ],
    votes: 53,
    voted: false
  },
  {
    id: 'feat-combat-recorder',
    title: '高难首领攻坚回放仪与行动轴分析器',
    icon: '📊',
    status: 'planned',
    statusLabel: '已列入规划',
    statusType: 'info',
    targetVersion: 'v2.5.0',
    description: '为攻坚机械神欧米茄、神龙与混沌言昭等天花板首领提供精准的行动轴时间戳回放，量化破盾时机、治疗覆盖与技能循环。',
    specs: [
      '支持导出战斗行动日志（Combat Log Timeline）',
      '复盘灭团原因分析与行动条 ATB 超车提示',
      '一键分享攻坚轴方案给其他冒险者'
    ],
    votes: 48,
    voted: false
  },
  {
    id: 'feat-custom-theme',
    title: '复古像素 CRT 滤镜与古典怀旧音轨切换',
    icon: '📺',
    status: 'proposal',
    statusLabel: '期望心愿',
    statusType: 'default',
    targetVersion: 'v2.5.0+',
    description: '拓展视听体验，允许玩家自由在现代高清像素与 90 年代黄金 CRT 扫描线显像管质感之间平滑切换，并包含由交响乐演奏的复古 16-Bit 芯片音轨。',
    specs: [
      '多档位可调节光栅、光晕曲率与色散抖动',
      '经典 16-Bit SFC 原版音色与重置管弦乐实时切换',
      '全屏沉浸怀旧游戏厅街机视窗模式'
    ],
    votes: 82,
    voted: false
  },
  {
    id: 'feat-pet-breeding',
    title: '魔兽使野生魔物捕获与牧场培养系统',
    icon: '🐾',
    status: 'proposal',
    statusLabel: '期望心愿',
    statusType: 'default',
    targetVersion: 'v2.5.0+',
    description: '大幅强化魔兽使（Beastmaster）职业玩法，允许在原野战斗中捕捉濒死魔物并放养于村落专属魔物农场中，成长后可作为召唤战兽上阵助攻。',
    specs: [
      '捕捉 147 种全图鉴普通与精英魔物作为随行伙伴',
      '喂养优质草药与肉类使魔物领悟辅助或强控战技',
      '农场魔物派遣寻宝探索，带回稀有矿石与野外遗物'
    ],
    votes: 68,
    voted: false
  }
])

const filteredFeatures = computed(() => {
  if (activeStatus.value === 'all') return features.value
  return features.value.filter(item => item.status === activeStatus.value)
})

const getStatusCount = (key: string) => {
  if (key === 'all') return features.value.length
  return features.value.filter(item => item.status === key).length
}

const totalVotes = computed(() => {
  return features.value.reduce((acc, cur) => acc + cur.votes, 0)
})

const toggleVote = (feature: FeaturePlan) => {
  if (feature.voted) {
    feature.votes--
    feature.voted = false
  } else {
    feature.votes++
    feature.voted = true
  }
}
</script>
