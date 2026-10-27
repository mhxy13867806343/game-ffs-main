<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-8 min-h-[calc(100vh-120px)]">
    <!-- 顶部面包屑与标题区 -->
    <div class="border-b border-slate-800/80 pb-6">
      <div class="flex items-center gap-2 text-xs text-gray-400 mb-2">
        <router-link to="/vble" class="hover:text-cyan-400 transition-colors">首页</router-link>
        <span>/</span>
        <span class="text-cyan-400 font-medium">客户端下载中心</span>
      </div>

      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <n-tag type="error" size="small" round strong>开发中</n-tag>
            <n-tag type="warning" size="small" round strong>{{ downloadInfo.version }}</n-tag>
            <n-tag type="success" size="small" round>包信息待核实</n-tag>
            <span class="text-xs text-gray-400 font-mono">原页面更新记录: {{ downloadInfo.updateDate }}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-white text-glow-amber tracking-tight">
            {{ downloadInfo.title }}
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            {{ downloadInfo.subtitle }}
          </p>
          <p class="text-xs sm:text-sm text-amber-300 mt-2 max-w-3xl leading-relaxed">
            {{ downloadInfo.releaseStatus }}
          </p>
        </div>

        <!-- 快捷分享按钮组 -->
        <div class="flex flex-wrap items-center gap-2.5 shrink-0">
          <n-button
            type="primary"
            size="medium"
            round
            strong
            class="shadow-[0_0_20px_rgba(0,243,255,0.3)]"
            @click="copyAllShareText"
          >
            <template #icon>📋</template>
            {{ copyAllStatusText }}
          </n-button>
          <router-link
            to="/vble/updates"
            class="px-3.5 py-2 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-gray-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
          >
            <span>🔄</span>
            <span>更新日志</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 核心概览横幅：规格参数卡片 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">压缩包大小记录</div>
        <div class="text-lg sm:text-xl font-black text-cyan-400 font-mono mt-1">{{ downloadInfo.packageSize }}</div>
        <div class="text-[10px] text-gray-500 mt-0.5">以分享页文件信息为准</div>
      </div>

      <div class="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">当前仓库引擎</div>
        <div class="text-lg sm:text-xl font-black text-amber-400 font-mono mt-1">Godot 4.6</div>
        <div class="text-[10px] text-gray-500 mt-0.5">下载包引擎版本待核实</div>
      </div>

      <div class="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">目标操作系统</div>
        <div class="text-lg sm:text-xl font-black text-green-400 font-mono mt-1">Win & Mac</div>
        <div class="text-[10px] text-gray-500 mt-0.5">包内平台与兼容性待核实</div>
      </div>

      <div class="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">网络与认证需求</div>
        <div class="text-lg sm:text-xl font-black text-purple-400 font-mono mt-1">离线单机方向</div>
        <div class="text-[10px] text-gray-500 mt-0.5">网盘下载规则另计</div>
      </div>
    </div>

    <!-- 核心区域：官方四大网盘下载专区 -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">📥</span>
          <h2 class="text-xl sm:text-2xl font-black text-white text-glow-cyan">网盘下载渠道</h2>
          <span class="text-xs text-gray-400 hidden sm:inline">（请先核对文件信息）</span>
        </div>
        <span class="text-xs text-amber-400 font-mono">尚无包校验与安全扫描记录可供核对</span>
      </div>

      <p class="text-xs text-gray-400 leading-relaxed">
        以下渠道描述沿用原页面记录，登录、客户端、速度与链接有效性未核实，以网盘当前规则为准。
      </p>

      <!-- 四网盘卡片矩阵 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div
          v-for="channel in channels"
          :key="channel.id"
          class="download-card p-5 sm:p-6 rounded-2xl bg-[#121626]/90 border border-slate-700/70 hover:border-cyan-400/60 shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
          :class="{ 'ring-2 ring-cyan-500/40': channel.recommended }"
        >
          <!-- 推荐角标 -->
          <div
            v-if="channel.recommended"
            class="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-blue-600 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-xl shadow-lg uppercase tracking-wider"
          >
            🔥 极速推荐
          </div>

          <!-- 卡片头部：图标 + 标题 + 标签 -->
          <div>
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border"
                :style="{ background: channel.color + '20', borderColor: channel.color + '50' }"
              >
                {{ channel.icon }}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-lg font-black text-white">{{ channel.name }}</h3>
                  <n-tag :type="channel.badgeType" size="tiny" round strong>
                    {{ channel.badge }}
                  </n-tag>
                </div>
                <p class="text-xs text-gray-400 mt-0.5 line-clamp-1">
                  {{ channel.speedTip }}
                </p>
              </div>
            </div>

            <!-- 特性标签列表 -->
            <div class="flex flex-wrap gap-1.5 my-3">
              <span
                v-for="(feat, idx) in channel.features"
                :key="idx"
                class="px-2 py-0.5 rounded-md bg-slate-800/80 text-[11px] text-gray-300 border border-slate-700/60"
              >
                ✓ {{ feat }}
              </span>
            </div>

            <!-- 提取码与复制区域 -->
            <div
              class="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2 my-4"
            >
              <div class="flex items-center gap-2 overflow-hidden">
                <span class="text-xs text-gray-400 shrink-0">提取码:</span>
                <span
                  class="font-mono text-sm font-bold text-amber-300 tracking-wider truncate"
                  :class="{ 'text-green-400': !channel.hasCode }"
                >
                  {{ channel.code }}
                </span>
              </div>
              <n-button
                v-if="channel.hasCode"
                size="tiny"
                type="primary"
                secondary
                round
                @click="copyCode(channel.code, channel.name)"
              >
                复制提取码
              </n-button>
              <span v-else class="text-[11px] text-green-400/80 font-mono">
                免提取码
              </span>
            </div>
          </div>

          <!-- 底部主操作按钮组 -->
          <div class="space-y-2 pt-2 border-t border-slate-800/80">
            <a
              :href="channel.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all shadow-md group cursor-pointer text-decoration-none"
            >
              <span>立即直达网盘下载</span>
              <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>

            <button
              type="button"
              class="w-full py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-gray-400 hover:text-gray-200 text-xs transition-colors flex items-center justify-center gap-1 border border-slate-700/50"
              @click="copyChannelShare(channel)"
            >
              <span>🔗</span>
              <span>复制此网盘分享文案</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 安装与运行新手 4 步教程 -->
    <section class="p-6 sm:p-8 rounded-2xl bg-[#121626]/80 border border-slate-800 space-y-6">
      <div class="flex items-center gap-2">
        <span class="text-2xl">🕹️</span>
        <h3 class="text-lg sm:text-xl font-bold text-white">客户端下载与运行指引</h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="step in installSteps"
          :key="step.step"
          class="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 relative space-y-2"
        >
          <div class="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-mono font-bold text-xs flex items-center justify-center">
            {{ step.step }}
          </div>
          <h4 class="text-sm font-bold text-gray-200">{{ step.title }}</h4>
          <p class="text-xs text-gray-400 leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 运行环境硬件规格对比 -->
    <section class="space-y-4">
      <h3 class="text-base sm:text-lg font-bold text-gray-200 flex items-center gap-2">
        <span>💻 电脑软硬件配置参考（尚未完成包体兼容性验证）</span>
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 最低配置 -->
        <div class="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="font-bold text-gray-200 text-sm">原页面基础配置参考</span>
            <n-tag size="tiny" type="default">性能待验证</n-tag>
          </div>
          <ul class="text-xs text-gray-300 space-y-2">
            <li><strong>操作系统：</strong> Windows 10 (64-bit) / macOS 11+</li>
            <li><strong>处理器：</strong> Intel Core i3 2.0GHz 或同等 AMD 处理器</li>
            <li><strong>内存：</strong> 4 GB RAM</li>
            <li><strong>图形显卡：</strong> Intel HD Graphics 4000 / GeForce GT 710 (支持 OpenGL 3.3)</li>
            <li><strong>存储空间：</strong> 需要 3 GB 可用磁盘空间</li>
          </ul>
        </div>

        <!-- 推荐配置 -->
        <div class="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="font-bold text-amber-300 text-sm">原页面较高配置参考</span>
            <n-tag size="tiny" type="warning">性能待验证</n-tag>
          </div>
          <ul class="text-xs text-gray-300 space-y-2">
            <li><strong>操作系统：</strong> Windows 11 (64-bit) / macOS 13+ (Apple Silicon 原生加速)</li>
            <li><strong>处理器：</strong> Intel Core i5 / AMD Ryzen 5 或 Apple M1/M2/M3</li>
            <li><strong>内存：</strong> 8 GB RAM 或更高</li>
            <li><strong>图形显卡：</strong> NVIDIA GeForce GTX 1050 / AMD RX 560 或集成核显</li>
            <li><strong>外设支持：</strong> Xbox / PS5 DualSense 原生震动无线手柄 / 键盘快捷键</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 默认按键与控制器操作指南 (同步 Godot 引擎 settings_controls_reference.gd 权威规范) -->
    <section class="space-y-4">
      <h3 class="text-base sm:text-lg font-bold text-gray-200 flex items-center gap-2">
        <span>🎮 游戏默认键位操作指南 (根据 Godot 引擎官方设置编纂)</span>
      </h3>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <div class="text-gray-400">八向角色移动</div>
          <div class="font-mono text-cyan-400 font-bold">W/A/S/D 或 ↑/↓/←/→</div>
          <div class="text-[10px] text-gray-500">城镇与迷宫自由走动</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <div class="text-gray-400">疾跑加速</div>
          <div class="font-mono text-amber-400 font-bold">Shift (长按)</div>
          <div class="text-[10px] text-gray-500">2倍速探索快速跑图</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <div class="text-gray-400">交谈 / 调查 / 确认</div>
          <div class="font-mono text-emerald-400 font-bold">E / Space / Enter</div>
          <div class="text-[10px] text-gray-500">NPC对话与宝箱触发</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <div class="text-gray-400">返回 / 取消</div>
          <div class="font-mono text-rose-400 font-bold">Esc / X</div>
          <div class="text-[10px] text-gray-500">关闭面板或退出选择</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <div class="text-gray-400">陆行鸟与黑鸟飞行</div>
          <div class="font-mono text-yellow-400 font-bold">E (上下骑) / G (切换)</div>
          <div class="text-[10px] text-gray-500">地行奔袭与林间飞渡</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <div class="text-gray-400">探索主菜单</div>
          <div class="font-mono text-purple-400 font-bold">M / Esc</div>
          <div class="text-[10px] text-gray-500">打开同伴/装备/存档大典</div>
        </div>
      </div>

      <!-- 战斗专属快捷指令指南 -->
      <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
        <div class="font-bold text-amber-300 flex items-center gap-1.5">
          <span>⚔️</span>
          <span>战斗指令与目标选定快捷规范 (Battle Command & Target Controls):</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-gray-300">
          <div class="p-2.5 rounded bg-slate-950/70 border border-slate-800/80">
            <span class="text-cyan-400 font-bold block mb-0.5">← / → 方向键</span>
            <span>在敌方目标列与我方队员列之间无缝横向切换阵营（如白魔法施向不死魔物）</span>
          </div>
          <div class="p-2.5 rounded bg-slate-950/70 border border-slate-800/80">
            <span class="text-emerald-400 font-bold block mb-0.5">↑ / ↓ 方向键</span>
            <span>在上阵的多名同伴或成群魔物行之间逐项移动瞄准光标</span>
          </div>
          <div class="p-2.5 rounded bg-slate-950/70 border border-slate-800/80">
            <span class="text-amber-400 font-bold block mb-0.5">Enter / Space 确认</span>
            <span>锁定当前目标执行行动；失焦时系统自动保活当前目标行焦点</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题答疑 FAQ -->
    <section class="p-5 sm:p-6 rounded-2xl bg-[#121626]/70 border border-slate-800 space-y-4">
      <h3 class="text-base sm:text-lg font-bold text-gray-200 flex items-center gap-2">
        <span>❓ 玩家下载与运行高频疑问</span>
      </h3>

      <div class="space-y-3 text-xs">
        <div class="p-3 rounded-lg bg-slate-900/50 border border-slate-800/80">
          <div class="font-bold text-amber-300 mb-1">Q: 游戏是否需要联网才能玩？单机能保证存档安全吗？</div>
          <div class="text-gray-300 leading-relaxed">
            A: 游戏按离线单机方向开发；下载与可选联网功能的要求以对应版本说明为准。存档机制不能保证断电后恢复最新进度，请保留独立备份。
          </div>
        </div>

        <div class="p-3 rounded-lg bg-slate-900/50 border border-slate-800/80">
          <div class="font-bold text-amber-300 mb-1">Q: 四个网盘下载的内容有什么区别吗？选择哪个好？</div>
          <div class="text-gray-300 leading-relaxed">
            A: 本页保留四个下载渠道，目前未核实各渠道文件是否为同一版本。请对照分享页与包内说明；登录、客户端和速度限制以各平台当前规则为准。
          </div>
        </div>

        <div class="p-3 rounded-lg bg-slate-900/50 border border-slate-800/80">
          <div class="font-bold text-amber-300 mb-1">Q: 运行时弹出 Windows Defender 或防病毒软件拦截怎么办？</div>
          <div class="text-gray-300 leading-relaxed">
            A: 本页尚无下载包签名、哈希与安全扫描记录可供核对。请先核实文件来源与发布说明，按系统或安全软件提示检查文件。
          </div>
        </div>
      </div>
    </section>

    <!-- Naive UI 精美文案分享弹窗 (支持手动查看与一键复制) -->
    <n-modal
      v-model:show="isShareModalVisible"
      preset="card"
      :title="`📋 ${shareModalTitle}`"
      class="max-w-xl bg-[#121626] border border-slate-700/80 rounded-2xl"
      size="medium"
    >
      <div class="space-y-4">
        <p class="text-xs text-gray-400">
          您可以直接点击下方按钮一键复制，或全选下方文本框中的内容发送至微信群、QQ群、贴吧或各大玩家社区：
        </p>
        <n-input
          :value="shareModalContent"
          :input-props="{ 'aria-label': shareModalTitle }"
          type="textarea"
          :rows="12"
          readonly
          class="font-mono text-xs"
        />
        <div class="flex justify-end gap-2 pt-2">
          <n-button secondary @click="isShareModalVisible = false">关闭</n-button>
          <n-button type="primary" @click="handleModalCopy">
            一键复制到剪贴板
          </n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import {
  GAME_DOWNLOAD_INFO,
  DOWNLOAD_CHANNELS,
  INSTALL_STEPS,
  DownloadChannel,
  generateShareText
} from '../config/downloadConfig'

const message = useMessage()
const notification = useNotification()

const downloadInfo = GAME_DOWNLOAD_INFO
const channels = DOWNLOAD_CHANNELS
const installSteps = INSTALL_STEPS

const copyAllStatusText = ref('复制完整分享文案')
const isShareModalVisible = ref(false)
const shareModalContent = ref('')
const shareModalTitle = ref('4 大网盘分享文案')

// 复制单个网盘提取码 (使用 Naive UI 提示)
const copyCode = async (code: string, channelName: string) => {
  try {
    await navigator.clipboard.writeText(code)
    message.success(`已成功复制 ${channelName} 提取码: ${code}`, {
      duration: 3000
    })
  } catch {
    shareModalTitle.value = `${channelName} 提取码`
    shareModalContent.value = code
    isShareModalVisible.value = true
    message.info(`已为您展开 ${channelName} 提取码弹窗，请直接复制`)
  }
}

// 复制单个网盘分享信息 (使用 Naive UI 提示)
const copyChannelShare = async (channel: DownloadChannel) => {
  const shareText = `【${downloadInfo.title} 客户端下载】
${downloadInfo.releaseStatus}
渠道：${channel.name}
下载链接：${channel.url}
${channel.hasCode ? `提取码：${channel.code}` : '无需提取码'}`

  try {
    await navigator.clipboard.writeText(shareText)
    message.success(`已复制 ${channel.name} 分享信息，可直接粘贴到微信/QQ群！`, {
      duration: 3500
    })
  } catch {
    shareModalTitle.value = `${channel.name} 分享文案`
    shareModalContent.value = shareText
    isShareModalVisible.value = true
    message.info('已为您打开文案弹窗，可直接复制')
  }
}

// 一键复制全量分享文案 (使用 Naive UI 提示)
const copyAllShareText = async () => {
  const text = generateShareText()
  try {
    await navigator.clipboard.writeText(text)
    copyAllStatusText.value = '✓ 已复制完整文案！'
    notification.success({
      title: '分享文案复制成功',
      content: '已复制 4 大网盘分享文案，可直接粘贴至群聊发送给玩家！',
      duration: 4000
    })
    setTimeout(() => {
      copyAllStatusText.value = '复制完整分享文案'
    }, 3500)
  } catch {
    shareModalTitle.value = '4 大网盘完整分享文案'
    shareModalContent.value = text
    isShareModalVisible.value = true
    message.info('已为您打开完整分享文案弹窗，可在此复制')
  }
}

// 弹窗内复制按钮
const handleModalCopy = async () => {
  try {
    await navigator.clipboard.writeText(shareModalContent.value)
    message.success('已成功复制文本到剪贴板！')
    isShareModalVisible.value = false
  } catch {
    message.warning('浏览器阻止了自动剪贴板，请在上方文本框中手动全选复制')
  }
}
</script>
