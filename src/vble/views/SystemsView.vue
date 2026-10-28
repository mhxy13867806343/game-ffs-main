<template>
  <div class="systems-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Underlying Engine & Architecture</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">深渊系统与底层工程架构体系</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        系统解析 49 层深渊斗技场规则、三层防崩溃持久化架构、音频总线 DSP 滤波器、ATB 动态调度管线与键位独立改绑偏好体系
      </p>
    </div>

    <!-- 🛠️ Godot 4.6 LTS 全局引擎拓扑、分帧性能剖析器与音频 DSP 混音工坊 -->
    <div class="bg-gradient-to-br from-[#0c1322]/95 via-[#13122c]/90 to-[#0e1628]/95 border border-cyan-500/50 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-5 relative overflow-hidden">
      <!-- 头部与控制栏 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/40 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">⚙️</span>
            <h2 class="text-lg sm:text-xl font-black text-cyan-300">
              Godot 4.6 LTS 引擎子系统拓扑、帧预算剖析与音频 DSP 工坊 (Engine Architecture Studio)
            </h2>
            <n-tag size="small" type="success" round strong>60FPS 帧预算控制</n-tag>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            实时推演 Godot 引擎主循环时序分配（16.6ms 帧预算）、逻辑/物理/渲染分帧调度、三层防崩溃存储镜像与 5 路音频总线 DSP 滤波器矩阵！
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetEngineStudio">
            🔄 重置基准参数
          </n-button>
          <n-button
            size="small"
            :type="isSimStress ? 'error' : 'primary'"
            class="font-bold shadow"
            @click="toggleStressSimulation"
          >
            {{ isSimStress ? '🛑 退出极限压力测试' : '🔥 模拟百人同屏核爆高压' }}
          </n-button>
        </div>
      </div>

      <!-- 三大核心工坊面板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 栏 1: 帧预算分配与分阶段耗时分析 (6 cols) -->
        <div class="lg:col-span-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3.5 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-cyan-300 flex items-center gap-1.5">
                <span>📊</span> 实时帧预算负载 (16.6ms / 60 FPS)
              </span>
              <span class="font-mono text-xs" :class="totalFrameMs > 16.6 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'">
                {{ totalFrameMs.toFixed(1) }} ms / 16.6 ms ({{ currentFps }} FPS)
              </span>
            </div>

            <!-- 帧时间彩条 -->
            <div class="space-y-1.5">
              <div class="flex h-4 rounded-lg overflow-hidden border border-slate-700/80 text-[9px] font-mono font-bold text-slate-950">
                <div class="bg-cyan-400 flex items-center justify-center transition-all duration-300" :style="{ width: `${(frameMetrics.logic / 16.6) * 100}%` }">
                  LOGIC
                </div>
                <div class="bg-indigo-400 flex items-center justify-center transition-all duration-300" :style="{ width: `${(frameMetrics.physics / 16.6) * 100}%` }">
                  PHYS
                </div>
                <div class="bg-amber-400 flex items-center justify-center transition-all duration-300" :style="{ width: `${(frameMetrics.render / 16.6) * 100}%` }">
                  RENDER
                </div>
                <div class="bg-purple-400 flex items-center justify-center transition-all duration-300" :style="{ width: `${(frameMetrics.audio / 16.6) * 100}%` }">
                  AUDIO
                </div>
                <div class="bg-emerald-900/40 text-emerald-300 flex items-center justify-center flex-1">
                  IDLE
                </div>
              </div>
              <div class="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                <span>0 ms</span>
                <span>8.3 ms (120 FPS)</span>
                <span>16.6 ms (60 FPS)</span>
              </div>
            </div>

            <!-- 分项耗时与滑块控制 -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-2 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                <div class="flex justify-between text-gray-400">
                  <span>🧠 游戏逻辑/AI:</span>
                  <span class="font-mono text-cyan-300">{{ frameMetrics.logic.toFixed(1) }} ms</span>
                </div>
                <div class="text-[10px] text-gray-500">ATB状态机、魔物仇恨决策树</div>
              </div>

              <div class="p-2 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                <div class="flex justify-between text-gray-400">
                  <span>📐 碰撞与寻路:</span>
                  <span class="font-mono text-indigo-300">{{ frameMetrics.physics.toFixed(1) }} ms</span>
                </div>
                <div class="text-[10px] text-gray-500">A*网格寻路、障碍物包围盒</div>
              </div>

              <div class="p-2 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                <div class="flex justify-between text-gray-400">
                  <span>🎨 渲染与DrawCalls:</span>
                  <span class="font-mono text-amber-300">{{ frameMetrics.render.toFixed(1) }} ms</span>
                </div>
                <div class="text-[10px] text-gray-500">CRT滤镜、全屏粒子、TileMap</div>
              </div>

              <div class="p-2 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                <div class="flex justify-between text-gray-400">
                  <span>🎵 音频DSP与混音:</span>
                  <span class="font-mono text-purple-300">{{ frameMetrics.audio.toFixed(1) }} ms</span>
                </div>
                <div class="text-[10px] text-gray-500">低通滤波、卷积混响、环绕声</div>
              </div>
            </div>
          </div>

          <!-- 诊断状态 -->
          <div class="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono" :class="totalFrameMs > 16.6 ? 'text-rose-400' : 'text-emerald-400'">
            {{ frameHealthMessage }}
          </div>
        </div>

        <!-- 栏 2: 5 路音频总线 DSP 滤波器矩阵 (6 cols) -->
        <div class="lg:col-span-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3.5 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-amber-300 flex items-center gap-1.5">
                <span>🎚️</span> 5 路音频总线与 DSP 低通调谐
              </span>
              <span class="text-gray-400 font-mono text-[11px]">audio_dsp_bus_matrix.gd</span>
            </div>

            <!-- 常用声学情境预设切换 -->
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="preset in dspPresets"
                :key="preset.id"
                type="button"
                class="px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1"
                :class="activeDspPresetId === preset.id
                  ? 'bg-amber-950/60 border-amber-400 text-amber-200 font-bold'
                  : 'bg-slate-900/80 border-slate-800 text-gray-400 hover:border-slate-700'"
                @click="applyDspPreset(preset.id)"
              >
                <span>{{ preset.icon }}</span>
                <span>{{ preset.name }}</span>
              </button>
            </div>

            <!-- 总线滑块控制 -->
            <div class="space-y-2 text-xs">
              <div>
                <div class="flex justify-between text-gray-300 text-[11px] mb-0.5">
                  <span>主音量 (Master Bus):</span>
                  <span class="font-mono text-cyan-400 font-bold">{{ masterVolume }} dB</span>
                </div>
                <n-slider v-model:value="masterVolume" :min="-40" :max="6" :step="1" />
              </div>

              <div>
                <div class="flex justify-between text-gray-300 text-[11px] mb-0.5">
                  <span>背景音乐 (BGM Bus):</span>
                  <span class="font-mono text-amber-400 font-bold">{{ bgmVolume }} dB</span>
                </div>
                <n-slider v-model:value="bgmVolume" :min="-40" :max="6" :step="1" />
              </div>

              <div>
                <div class="flex justify-between text-gray-300 text-[11px] mb-0.5">
                  <span>低通滤波截止频率 (Low-Pass Filter):</span>
                  <span class="font-mono font-bold" :class="lowPassCutoff <= 1000 ? 'text-rose-400' : 'text-emerald-400'">
                    {{ lowPassCutoff }} Hz {{ lowPassCutoff <= 1000 ? '(已阻隔高频 · 菜单微闷音质)' : '(全频放行)' }}
                  </span>
                </div>
                <n-slider v-model:value="lowPassCutoff" :min="400" :max="20000" :step="200" />
              </div>
            </div>
          </div>

          <!-- DSP 审计回响 -->
          <div class="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-gray-300 flex items-center justify-between">
            <span class="truncate">🔊 {{ dspStatusEcho }}</span>
            <n-tag size="tiny" :type="lowPassCutoff <= 1000 ? 'warning' : 'success'">
              {{ lowPassCutoff <= 1000 ? '800Hz 滤波激活' : '常规混音输出' }}
            </n-tag>
          </div>
        </div>
      </div>

      <!-- 实装审计底栏 -->
      <div class="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-900/40 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-cyan-400 text-base">⚡</span>
          <span class="font-bold text-cyan-300">引擎总线调度回响：</span>
          <span class="text-gray-200 font-mono">{{ engineAuditLog }}</span>
        </div>
        <div class="text-[11px] text-gray-500 font-mono">
          底层契约: engine_subsystem_orchestrator.gd & audio_dsp_bus_matrix.gd
        </div>
      </div>
    </div>

    <!-- 架构卡片网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 49 层深渊斗技场 -->
      <n-card hoverable class="border border-purple-900/60 bg-[#15102a]/90 rounded-xl" title="🌀 49 层无限深渊斗技场 (Abyss Coliseum)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            位于次元之隙裂缝深处的极限 Roguelike 攀登挑战。玩家需携带预备队伍连续挑战 49 阶具有特殊词缀环境的试炼层。
          </p>
          <div class="p-3 bg-slate-900/80 rounded border border-purple-900/30 space-y-1">
            <div class="text-purple-300 font-bold">⭐ 核心深渊机制:</div>
            <ul class="list-disc list-inside text-gray-400 space-y-1">
              <li><strong>每 5 层首领据点:</strong> 遭遇强力强化版经典 Boss，掉落【深渊黑金代币】。</li>
              <li><strong>随机环境词缀:</strong> 包含【法力狂涌】、【物理重压】、【时间加速】与【虚空湮灭】。</li>
              <li><strong>终极 49F 守关者:</strong> 迎战【混沌虚无化身】，通关获赠唯一限定武器【诸神之黄昏·改】。</li>
            </ul>
          </div>
        </div>
      </n-card>

      <!-- 三层持久化架构 -->
      <n-card hoverable class="border border-cyan-900/60 bg-[#0d1629]/90 rounded-xl" title="💾 三层数据持久化与崩溃防护架构">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            保障多端运行零回档风险的高容错存储架构，支持本地 JSON、内存快照与二进制镜像三重热备。
          </p>
          <div class="p-3 bg-slate-900/80 rounded border border-cyan-900/30 space-y-1">
            <div class="text-cyan-300 font-bold">⭐ 存储流水分层:</div>
            <ul class="list-disc list-inside text-gray-400 space-y-1">
              <li><strong>第一层 (内存状态机):</strong> 毫秒级内存镜像，记录即时战斗行动条与角色 HP/MP。</li>
              <li><strong>第二层 (本地快照持久化):</strong> 切图/通关触发 JSON 压缩序列化，附带 CRC32 完整性校验。</li>
              <li><strong>第三层 (安全回退槽位):</strong> 遇异常闪退时自动激活上一次安全营地镜像，杜绝死档坏档。</li>
            </ul>
          </div>
        </div>
      </n-card>

      <!-- 音频总线 DSP 滤波器 -->
      <n-card hoverable class="border border-amber-900/60 bg-[#1f1910]/90 rounded-xl" title="🎵 音频总线 DSP 低通滤波与动态混音">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            Godot 4.4 深度定制音频总线管线，根据玩家所处游戏状态实现无缝情境混音。
          </p>
          <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
            <div class="text-amber-300 font-bold">⭐ 声效声场处理:</div>
            <ul class="list-disc list-inside text-gray-400 space-y-1">
              <li><strong>菜单与暂停低通滤波:</strong> 打开道具栏或暂停时，BGM 自动平滑经过 800Hz 低通滤波器。</li>
              <li><strong>深海与洞窟混响:</strong> 在沉没塔与熔岩地宫触发卷积混响 (Convolution Reverb) 湿音强化。</li>
              <li><strong>战斗入场平滑过渡:</strong> 原野大地图音乐与战斗曲《最终决战》通过 0.4s 等功率平滑交叉淡化。</li>
            </ul>
          </div>
        </div>
      </n-card>

      <!-- ATB 动态蓄力调度管线 -->
      <n-card hoverable class="border border-green-900/60 bg-[#0d1e18]/90 rounded-xl" title="⏳ ATB 敏捷速率动态调度管线">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            基于敏捷度 (AGI) 与加速/减速/停滞状态的精准时间步进驱动。
          </p>
          <div class="p-3 bg-slate-900/80 rounded border border-green-900/30 space-y-1">
            <div class="text-green-300 font-bold">⭐ 调度算法要点:</div>
            <ul class="list-disc list-inside text-gray-400 space-y-1">
              <li><strong>动态步长累加:</strong> <code>gauge += (agi * speed_mult * delta) / max_gauge</code></li>
              <li><strong>法术蓄力前摇 (Cast Time):</strong> 高阶禁术追加吟唱充能进度条，期间受击有概率被打断。</li>
              <li><strong>指令响应队列:</strong> 支持等待模式 (Wait Mode) 与活跃模式 (Active Mode) 自由切换。</li>
            </ul>
          </div>
        </div>
      </n-card>

      <!-- 键盘键位自定义与独立持久化偏好架构 -->
      <n-card hoverable class="border border-blue-900/60 bg-[#0b172a]/90 rounded-xl md:col-span-2" title="⌨️ 键盘键位自定义与独立偏好持久化架构 (Persistent Keyboard Rebinding)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            设置系统第三页全新引入全套动作改绑支持，采用与游戏存档解耦的单机偏好配置文件，具备完整的原子写入、异常回退与输入保护机制。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-blue-900/30 space-y-1">
              <div class="text-blue-300 font-bold">⭐ 9 大动作主键覆盖:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>探索移动:</strong> 上下左右四向移动绑定 (<code>move_up/down/left/right</code>)。</li>
                <li><strong>交互与探索:</strong> 奔跑 (<code>run</code>)、交谈／调查 (<code>interact</code>)、探索菜单 (<code>menu</code>)。</li>
                <li><strong>界面核心:</strong> 确认 (<code>confirm</code>)、取消 (<code>cancel</code>)。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-blue-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 存储与容灾隔离:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>独立系统偏好:</strong> 存储于 <code>user://keybindings.cfg</code>，换周目/换档零污染。</li>
                <li><strong>原子写入与刷新:</strong> 临时文件写入 + flush + 长度校验成功后原子替换。</li>
                <li><strong>坏包整包回退:</strong> 损坏文件整包退回原项目默认映射，保留原文件供用户排查。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-blue-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 输入保护与 GUI 兼容:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>基础兜底保底:</strong> 方向键、Enter/Space 与 Esc 永久常驻防死锁。</li>
                <li><strong>UI 事件同态映射:</strong> 自动同步发布 <code>ui_accept</code> / <code>ui_cancel</code> 驱动原生控件。</li>
                <li><strong>输入防冲突:</strong> 禁用 Tab 避免焦点冲突；修饰键仅奔跑允许单独使用。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 真实居民来源登记与主线雷达追踪架构 -->
      <n-card hoverable class="border border-indigo-900/60 bg-[#0e132c]/90 rounded-xl md:col-span-2" title="🧭 主线目标雷达追踪与真实居民来源登记架构 (ResidentSourceRegistry)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            全新设计的全域主线导航与探索居民来源安全管理体系。为 44 个主线剧情节拍与正式地图探索 NPC 建立弱引用生命周期管理与纯读雷达 Marker 投影。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-indigo-900/30 space-y-1">
              <div class="text-indigo-300 font-bold">⭐ 单宿主弱引用凭据控制:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>弱引用隔离:</strong> 仅保存 host、player、source 的 WeakRef，严禁静态全局强引用。</li>
                <li><strong>单节点管控:</strong> 每个正式地图 Scene 仅在根节点挂载唯一凭据控制器，杜绝同名冲突。</li>
                <li><strong>场景安全校验:</strong> 严格匹配 exact 脚本与地图场景类型，house 或非法节点拒不授标。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-indigo-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 纯读状态机门禁 (Lookup Guard):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>多状态动态阻断:</strong> 过场、对白锁、菜单打开、场景过渡、神殿机关覆盖时自动拒绝授标。</li>
                <li><strong>纯读无副作用:</strong> 查询过程绝不写入 GameState、不重绘物理实体、不产生垃圾。</li>
                <li><strong>瞬时解锁恢复:</strong> 退出对白或关闭菜单后，同访问票据瞬时无缝恢复有效。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-indigo-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 墓碑机制与全域 44 节拍:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>安全退役墓碑:</strong> 节点离树、场景切换或周目变更彻底注销凭据，杜绝复活与跨图伪冒。</li>
                <li><strong>44 节拍全域覆盖:</strong> ch01～ch12 全主线方位无缝分派，大地图 HUD 雷达精准标定。</li>
                <li><strong>实体级像素对齐:</strong> 居民雷达 Marker 与 NPC 实体坐标像素级实时对齐。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 机关解谜参与者锁定、单人遇袭破阵与现场题库架构 (基于 Godot D02 深度核查规范) -->
      <n-card hoverable class="border border-purple-900/60 bg-[#150f24]/90 rounded-xl md:col-span-2" title="🧩 机关解谜参与者锁定、单人遇袭破阵与现场题库体系 (Puzzle Participant & DecryptModule)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机解谜核心管线（<code>decrypt_module.gd</code> / <code>puzzle_system.gd</code>）与队伍状态机（<code>game_state_party.gd</code>）深度协同，确保解密机关过程严守<strong>首位队首锁定</strong>、<strong>中途禁止换位</strong>、<strong>单人遇袭入战</strong>与<strong>战后资源无损同步</strong>四项核心安全底线。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-purple-900/30 space-y-1.5">
              <div class="text-purple-300 font-bold">🔒 队首锁定与禁换位防御:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>队首角色绑定:</strong> 开启解谜瞬时锁定当前活跃领队（<code>get_party_leader_view</code>），切题不换人。</li>
                <li><strong>禁用换位作弊:</strong> 解题期间 <code>GameStateParty.swap</code> 强制拒绝，石化/睡眠/倒地者无法代派。</li>
                <li><strong>草稿与断点恢复:</strong> 退出解谜或遇袭中断时立即原子保存草稿，重入无损恢复输入。</li>
              </ul>
            </div>

            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1.5">
              <div class="text-amber-300 font-bold">⚔️ 明怪单人入战与资源同步:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>单人入战契约:</strong> 山洞第四门遇袭标记 <code>source="puzzle"</code>，仅锁定演员单枪匹马出战。</li>
                <li><strong>战后资源守恒:</strong> 胜出或逃跑后将演员实战 HP/MP/异常状态精确同步回大地图。</li>
                <li><strong>100px 避敌光环:</strong> 解密现场 100 像素范围内自动冻结暗雷遭遇，确保心流免受打扰。</li>
              </ul>
            </div>

            <div class="p-3 bg-slate-900/80 rounded border border-cyan-900/30 space-y-1.5">
              <div class="text-cyan-300 font-bold">🏛️ 现场两大实体剧情题与 38 题库:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>王宫档案柜:</strong> 晨辉王宫 <code>(320, 480)</code> 档案柜密码锁，完成初始晶石与职业后解禁。</li>
                <li><strong>龙栖石板:</strong> 龙巢 <code>(400, 400)</code> 远古铭文石板，结识苍蓝龙裔后开放念动解谜。</li>
                <li><strong>38 题目录收录:</strong> 14 道新手教程题 + 24 章节进阶题库，支持重试冷却与安全析构。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 冒险情报手册系统与酒馆情报购阅会话架构 (基于 Godot D07 研发规范) -->
      <n-card hoverable class="border border-amber-900/60 bg-[#16120d]/95 rounded-xl md:col-span-2" title="📖 冒险情报手册系统与酒馆情报购阅会话架构 (AdventureIntel & Session Memory)">
        <template #header-extra>
          <n-tag type="warning" size="small" round strong>Godot D07 实机规范对齐</n-tag>
        </template>
        <div class="space-y-4 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机底栏菜单扩展装配【冒险情报】指令按钮（<code>adventure_intel_menu.gd</code>: 544, 6 坐标，340×72 规格），搭载只读会话缓存记忆机制（<code>adventure_intel_session.gd</code>）与正式情报聚合模型（<code>adventure_intel_read_model.gd</code>），实现酒馆首购凭证引导、多维分类检索与跨档强类型安全失效。
          </p>

          <!-- 架构三柱石 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1.5">
              <div class="text-amber-300 font-bold">🍺 酒馆情报购买与已购投影:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1 text-[11px]">
                <li><strong>麦酒首购收据 (Ale):</strong> 购买 10G 麦酒获取「始源神殿石径路线」，拆解为双事件对白防止 113px 视口裁切。</li>
                <li><strong>黑啤魔物情报 (Stout):</strong> 购买 25G 黑啤获取「绿色粘液怪弱点」，支持属性/物理/AI 行动四章节分段。</li>
                <li><strong>严格布尔购旗检验:</strong> 仅当 <code>flags[READ_FLAG] === true</code> 时才计入已购，未购地点与条目绝不泄露。</li>
              </ul>
            </div>

            <div class="p-3 bg-slate-900/80 rounded border border-cyan-900/30 space-y-1.5">
              <div class="text-cyan-300 font-bold">🛡️ 会话记忆与跨档防污染 (Session):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1 text-[11px]">
                <li><strong>三要素身份比对:</strong> 记录 <code>_owner</code>、<code>_cycle</code> 与 <code>_flags</code> 强引用，内容相等不能代替同一档案。</li>
                <li><strong>换档即刻遗忘 (forget):</strong> 换档或换周目立即赋新空字典释放引用，严禁把 A 档阅读位置授给 B 档。</li>
                <li><strong>滚动槽非负自然数:</strong> 记忆 <code>list_scroll</code> 与 <code>detail_scroll</code>，异常类型立即归零重置。</li>
              </ul>
            </div>

            <div class="p-3 bg-slate-900/80 rounded border border-purple-900/30 space-y-1.5">
              <div class="text-purple-300 font-bold">🔍 动态地点索引与章节裁决:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1 text-[11px]">
                <li><strong>纯已购地点计算:</strong> <code>locations()</code> 仅聚合真实已购条目所属地，杜绝未探索区域地名泄露。</li>
                <li><strong>分章节合法校验:</strong> 章节切换仅在有效已购条目支持分段时开放，未知章节安全退回 <code>all</code>。</li>
                <li><strong>只读纯净原则:</strong> 手册全流程不写系统设置、不写保存槽位、不产生额外持久化脏字段。</li>
              </ul>
            </div>
          </div>

          <!-- 交互演练台：酒馆情报购阅与手册多维阅读器模拟器 -->
          <div class="p-4 rounded-xl bg-slate-950/80 border border-amber-500/40 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-2">
              <div class="flex items-center gap-2">
                <span class="text-lg">🧪</span>
                <span class="font-bold text-amber-300">酒馆情报购阅与手册会话阅读演练台 (Interactive Intel Reader)</span>
              </div>
              <div class="flex items-center gap-2">
                <n-button size="tiny" secondary type="warning" @click="simulateSwitchSave">
                  🔄 模拟换档 (切换 Owner)
                </n-button>
                <n-button size="tiny" secondary type="info" @click="simulateSwitchCycle">
                  ⏭️ 模拟换周目 (Cycle +1)
                </n-button>
              </div>
            </div>

            <!-- 控制区 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-slate-900/70 p-3 rounded-lg border border-slate-800">
              <div>
                <span class="text-gray-400 text-[10px] block mb-1">晨辉酒馆首购状态:</span>
                <div class="flex items-center gap-3">
                  <label class="flex items-center gap-1 cursor-pointer text-gray-300 text-xs">
                    <input type="checkbox" v-model="intelFlags.tavern_ale_read" />
                    <span>麦酒情报 (10G)</span>
                  </label>
                  <label class="flex items-center gap-1 cursor-pointer text-gray-300 text-xs">
                    <input type="checkbox" v-model="intelFlags.tavern_stout_read" />
                    <span>黑啤情报 (25G)</span>
                  </label>
                </div>
              </div>

              <div>
                <span class="text-gray-400 text-[10px] block mb-1">动态地点过滤 (已购聚合):</span>
                <n-select v-model:value="selectedLocation" size="tiny" :options="availableLocations.map(l => ({ label: l === 'all' ? '全部已购地点' : l, value: l }))" />
              </div>

              <div>
                <span class="text-gray-400 text-[10px] block mb-1">章节分段选择器 (Sections):</span>
                <n-select v-model:value="selectedSection" size="tiny" :options="sectionOptions.map((s: any) => ({ label: s.title, value: s.id }))" />
              </div>

              <div>
                <span class="text-gray-400 text-[10px] block mb-1">快速关键词检索:</span>
                <n-input v-model:value="activeQuery" size="tiny" placeholder="检索标题 / 地点..." clearable />
              </div>
            </div>

            <!-- 列表与正文展示 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <!-- 左侧条目栏 -->
              <div class="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1.5">
                <div class="text-[11px] font-bold text-gray-400 flex items-center justify-between">
                  <span>已购情报清单 ({{ filteredIntelList.length }})</span>
                  <span class="text-[10px] text-amber-400 font-mono">MODEL.entries()</span>
                </div>
                <div v-if="filteredIntelList.length === 0" class="text-center py-6 text-gray-500 text-xs">
                  暂无已购情报，请勾选上方酒馆购买
                </div>
                <div
                  v-for="item in filteredIntelList"
                  :key="item.id"
                  @click="selectedEntryId = item.id; selectedSection = 'all'"
                  class="p-2 rounded cursor-pointer transition-colors text-xs"
                  :class="selectedEntryId === item.id ? 'bg-amber-950/60 border border-amber-500/50 text-amber-200' : 'bg-slate-950/60 border border-slate-800 text-gray-300 hover:border-slate-700'"
                >
                  <div class="font-bold flex items-center justify-between">
                    <span>📜 {{ item.title }}</span>
                  </div>
                  <div class="text-[10px] text-gray-500 mt-0.5 flex items-center justify-between">
                    <span>{{ item.location }}</span>
                    <span class="text-amber-400 font-mono">{{ item.cost }}</span>
                  </div>
                </div>
              </div>

              <!-- 右侧正文与会话状态 -->
              <div class="md:col-span-2 p-3 rounded bg-slate-900 border border-slate-800 space-y-2">
                <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-bold text-amber-300">{{ activeIntelEntry ? activeIntelEntry.title : '未选中情报' }}</span>
                    <n-tag v-if="activeIntelEntry" size="tiny" type="info">{{ activeIntelEntry.location }}</n-tag>
                  </div>
                  <div class="text-[10px] text-cyan-300 font-mono">
                    Owner: {{ activeOwner }} | Cycle: {{ activeCycle }}
                  </div>
                </div>

                <div class="p-2.5 rounded bg-slate-950/90 border border-slate-800/80 min-h-[80px] text-gray-200 text-xs leading-relaxed whitespace-pre-line">
                  {{ displayContent }}
                </div>

                <!-- 会话日志 -->
                <div class="p-2 rounded bg-black/40 border border-slate-800/60 text-[10px] font-mono space-y-0.5">
                  <div class="text-gray-500 font-bold">会话内存日志 (Session Lifecycle Trace):</div>
                  <div v-for="(log, idx) in sessionLog" :key="idx" class="text-amber-400/90 truncate">
                    &gt; {{ log }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 酒馆微醺状态机与步数醒酒管线架构 (Tavern Buzz State & Sobering Walk Engine) -->
      <n-card hoverable class="border border-amber-900/60 bg-[#1a140b]/90 rounded-xl md:col-span-2" title="🍺 酒馆微醺状态机与步数醒酒管线架构 (Tavern Buzz State & Sobering Walk Engine)">
        <div class="space-y-4 text-xs leading-relaxed">
          <p class="text-gray-300">
            对齐 Godot 引擎 <code>tavern_buzz_drink.gd</code>、<code>tavern_buzz_effect.gd</code> 与 <code>tavern_buzz_state.gd</code> 最新实机管线：实装酒馆饮酒递进微醺状态机、28px 步距累加醒酒算法、Shader 径向色散滤镜与精灵步态摆动模拟。
          </p>

          <!-- 核心三大架构设计 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 四阶微醺状态机 (Phase Machine):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>清醒 (Sober):</strong> 初始 0 杯，滤镜强度 strength = 0.0，无画面失真与步态偏摆。</li>
                <li><strong>微醺 (LightBuzz):</strong> 1~2 杯，酒意初起，保留清醒视界，重置当前已走步距。</li>
                <li><strong>酩酊大醉 (Drunk):</strong> &ge;3 杯，激活全屏径向色散与每 3 整步 &plusmn;4px 精灵交替晃动。</li>
                <li><strong>平滑醒酒 (Sobering):</strong> 走满 30 步 (840px) 触发平滑淡出，1 秒内强度渐变归零。</li>
              </ul>
            </div>

            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 视差色散与步态晃动算法:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>径向色散 Shader:</strong> 采用 <code>FILTER_SHADER</code> 在视口径向施加 R/B 频段偏移，平滑度与 strength 强关联。</li>
                <li><strong>交替晃动数学 (sway_pixels):</strong> <code>steps = floor(walked / 28px)</code>，步数&ge;3 且处于 Drunk 时，每 3 步在 &plusmn;4px 间反向震荡。</li>
                <li><strong>对白与静止避让:</strong> 仅计物理位移，对话或站立静止绝不推进醒酒步距。</li>
              </ul>
            </div>

            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-purple-300 font-bold">⭐ 零污染与场景生命周期安全:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>非持久化保全:</strong> 微醺杯数与步数绝不写入存档、StoryManager 旗标或战斗系统。</li>
                <li><strong>退场即时销毁 (_retire):</strong> 切图、换档或退出酒馆立即触发 <code>queue_free()</code>，杜绝跨场景幽灵滞留。</li>
                <li><strong>再来一杯经济锁:</strong> 单杯固定 10G，金币不足即刻终止且不扣除余额，已购情报永久免费重读。</li>
              </ul>
            </div>
          </div>

          <!-- 交互推演台: 酒馆买酒微醺与步距醒酒全息演练台 -->
          <div class="p-4 bg-slate-950/90 rounded-xl border border-amber-700/40 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-amber-900/30 pb-2">
              <div class="flex items-center gap-2">
                <span class="text-amber-400 font-bold text-sm">🧪 酒馆买酒微醺与步距醒酒全息演练台</span>
                <n-tag size="tiny" type="warning" round>Tavern Buzz Studio</n-tag>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-400 text-xs">金币钱包:</span>
                <span class="text-amber-400 font-mono font-bold text-xs">{{ buzzGold }} G</span>
                <n-button size="tiny" secondary type="warning" @click="buzzGold += 50">
                  +50G 充钱包
                </n-button>
                <n-button size="tiny" secondary type="error" @click="leaveTavern">
                  🚪 离开酒馆 (切图退役)
                </n-button>
              </div>
            </div>

            <!-- 控制按钮群与状态展示 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/70 p-3 rounded-lg border border-slate-800">
              <div class="space-y-1">
                <span class="text-gray-400 text-[10px] block">酒馆吧台交互 (10G/杯):</span>
                <n-button size="small" type="warning" block @click="buyDrink">
                  🍺 再来一杯 (10G)
                </n-button>
                <div class="text-[10px] text-gray-500">累计已饮: <strong class="text-amber-300 font-mono">{{ buzzCups }}</strong> 杯</div>
              </div>

              <div class="space-y-1">
                <span class="text-gray-400 text-[10px] block">物理移动模拟 (28px/步):</span>
                <div class="grid grid-cols-3 gap-1">
                  <n-button size="tiny" secondary @click="walkSteps(1)">+1 步</n-button>
                  <n-button size="tiny" secondary @click="walkSteps(5)">+5 步</n-button>
                  <n-button size="tiny" type="info" secondary @click="walkSteps(30)">+30 步</n-button>
                </div>
                <div class="text-[10px] text-gray-500">步数: <span class="text-cyan-300 font-mono">{{ buzzSteps }}</span>/30 步 ({{ buzzWalkedPixels }}px)</div>
              </div>

              <div class="space-y-1">
                <span class="text-gray-400 text-[10px] block">当前醉酒阶段 (Phase):</span>
                <div class="flex items-center gap-2">
                  <n-tag
                    :type="buzzPhase === 'Sober' ? 'default' : buzzPhase === 'LightBuzz' ? 'warning' : buzzPhase === 'Drunk' ? 'error' : 'success'"
                    size="small"
                  >
                    {{ buzzPhase === 'Sober' ? '😊 清醒 (Sober)' : buzzPhase === 'LightBuzz' ? '🍺 微醺 (LightBuzz)' : buzzPhase === 'Drunk' ? '🥴 酩酊大醉 (Drunk)' : '🍃 醒酒消退中' }}
                  </n-tag>
                </div>
                <div class="text-[10px] text-gray-400">滤镜强度: <span class="font-mono text-purple-300">{{ buzzStrength.toFixed(2) }}</span></div>
              </div>

              <div class="space-y-1">
                <span class="text-gray-400 text-[10px] block">精灵左右晃动偏移 (sway_pixels):</span>
                <div class="text-base font-black font-mono text-amber-300">
                  {{ buzzSway > 0 ? '+' : '' }}{{ buzzSway }} px
                </div>
                <div class="text-[10px] text-gray-500">每 3 步交替 &plusmn;4px &times; strength</div>
              </div>
            </div>

            <!-- 可视化视差与精灵摆动实时投影 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- 精灵步态模拟视窗 -->
              <div class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                <div class="text-[11px] font-bold text-gray-300 flex items-center justify-between">
                  <span>角色精灵位移全息投影 (LeaderSprite.offset.x)</span>
                  <span class="text-[10px] text-cyan-400 font-mono">28px/Step · sway: {{ buzzSway }}px</span>
                </div>
                <div class="h-28 bg-gradient-to-b from-slate-950 to-slate-900 rounded border border-slate-800 flex items-center justify-center relative overflow-hidden">
                  <!-- 步态指示线 -->
                  <div class="absolute inset-y-0 left-1/2 w-0.5 bg-cyan-500/20 pointer-events-none"></div>
                  <!-- 精灵模拟物 -->
                  <div
                    class="transition-transform duration-200 flex flex-col items-center"
                    :style="{ transform: `translateX(${buzzSway * 6}px)` }"
                  >
                    <div class="text-3xl filter select-none" :style="{ filter: `blur(${buzzStrength * 1.5}px)` }">
                      {{ buzzPhase === 'Drunk' ? '🥴' : buzzPhase === 'LightBuzz' ? '😏' : '🧙‍♂️' }}
                    </div>
                    <span class="text-[10px] font-mono text-amber-300 mt-1">Offset: {{ buzzSway }}px</span>
                  </div>
                  <!-- 滤镜状态水印 -->
                  <div class="absolute bottom-1 right-2 text-[10px] font-mono text-gray-500">
                    Shader Dispersion: {{ (buzzStrength * 100).toFixed(0) }}%
                  </div>
                </div>
              </div>

              <!-- 状态机流水日志 -->
              <div class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                <div class="text-[11px] font-bold text-gray-300 flex items-center justify-between">
                  <span>微醺生命周期审计追踪 (TavernBuzz Trace)</span>
                  <span class="text-[10px] text-amber-400 font-mono">SOBER_STEPS = 30</span>
                </div>
                <div class="p-2 rounded bg-black/40 border border-slate-800/80 min-h-[96px] text-[10px] font-mono space-y-1">
                  <div v-for="(log, idx) in buzzLog" :key="idx" class="text-amber-300/90 truncate">
                    &gt; {{ log }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 米西迪亚五大秘术与白魔专属魔导消耗折减架构 (Mysidia Spells & Personal MP Cost Engine) -->
      <n-card hoverable class="border border-purple-900/60 bg-[#150f24]/90 rounded-xl md:col-span-2" title="🔮 米西迪亚五大秘术与白魔专属魔导消耗折减架构 (Mysidia Spells & Personal MP Cost Engine)">
        <div class="space-y-4 text-xs leading-relaxed">
          <p class="text-gray-300">
            对齐 Godot 引擎 <code>mysidia_magic_effects.gd</code> 与 <code>personal_magic_cost.gd</code> 最新实机管线：全息实装米西迪亚全复活、爆炎、爆雪、全域强加速与重力术五大课业，白魔专属圣物 (Item 2121) 友方治疗/复活 50% MP 减半折扣算法，以及非 Boss 战时重力术削减 25% 当前生命的安全门禁。
          </p>

          <!-- 核心三大架构设计 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-purple-900/30 space-y-1">
              <div class="text-purple-300 font-bold">⭐ 米西迪亚五大秘术规约:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>mysidia_arise:</strong> 白魔法 Lv.6, 60 MP, 友方单体 100% 满生命复活。</li>
                <li><strong>mysidia_firaga:</strong> 黑魔法 Lv.5, 40 MP, 威力 240, 火属性单体 (支持全域分摊)。</li>
                <li><strong>mysidia_blizzaga:</strong> 黑魔法 Lv.5, 40 MP, 威力 240, 冰属性单体 (支持全域分摊)。</li>
                <li><strong>mysidia_hastega:</strong> 时魔导 Lv.5, 30 MP, 友方全域强加速 (+50% ATB 速率)。</li>
                <li><strong>mysidia_gravity:</strong> 时魔导 Lv.5, 24 MP, 削减目标 25% 当前生命 (非 Boss 独占)。</li>
              </ul>
            </div>

            <div class="p-3 bg-slate-900/80 rounded border border-purple-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 白魔专属折减算法 (Item 2121):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>白名单契约:</strong> 仅作用于 <code>cure, cura, curaga, life, mysidia_arise</code>。</li>
                <li><strong>折减数学:</strong> <code>maxi(1, ceili(float(canonical_cost) * 0.5))</code>，60 MP 骤降为 30 MP！</li>
                <li><strong>友方限定守卫:</strong> 目标阵营必须为 <code>BattleModel.TEAM_PARTY</code>，敌对释放不享优惠。</li>
                <li><strong>零持久化污染:</strong> 仅在战斗中即时投影，不修改数据库条目真实规范 MP。</li>
              </ul>
            </div>

            <div class="p-3 bg-slate-900/80 rounded border border-purple-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 重力术严苛安全门禁:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>Boss 免疫熔断:</strong> <code>is_boss == true</code> 或多阶段 Boss 全场随从严禁重力术。</li>
                <li><strong>状态免疫守卫:</strong> 目标持有 <code>gravity</code> 状态免疫时强制返回 0 伤害。</li>
                <li><strong>削减上限钳制:</strong> <code>mini(target.hp - 1, floor(target.hp * 0.25))</code>，绝不直接击杀。</li>
              </ul>
            </div>
          </div>

          <!-- 交互推演台: 米西迪亚秘术施法与折减推演台 -->
          <div class="p-4 bg-slate-950/90 rounded-xl border border-purple-700/40 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-purple-900/30 pb-2">
              <div class="flex items-center gap-2">
                <span class="text-purple-400 font-bold text-sm">🧪 米西迪亚秘术施法与折减推演台</span>
                <n-tag size="tiny" type="info" round>Mysidia Magic Studio</n-tag>
              </div>
              <div class="flex items-center gap-2">
                <n-button size="tiny" secondary type="warning" @click="resetMysidiaStudio">
                  🔄 重置演练
                </n-button>
              </div>
            </div>

            <!-- 控制面板 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <div class="space-y-1">
                <div class="text-gray-400 text-[10px] font-bold">选择施法秘术 (Magic Spell):</div>
                <n-select v-model:value="selectedMysidiaSpell" size="small" :options="mysidiaSpellOptions" />
              </div>

              <div class="space-y-1">
                <div class="text-gray-400 text-[10px] font-bold">目标阵营与遭遇环境:</div>
                <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer mt-1">
                  <input type="checkbox" v-model="mysidiaTargetIsFriend" />
                  <span>目标为友方同伴 (Team Party)</span>
                </label>
                <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                  <input type="checkbox" v-model="mysidiaIsBossEncounter" />
                  <span>当前处于 Boss 战遭遇</span>
                </label>
              </div>

              <div class="space-y-1">
                <div class="text-gray-400 text-[10px] font-bold">专属圣物 (Item 2121):</div>
                <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer mt-1">
                  <input type="checkbox" v-model="mysidiaHasItem2121" />
                  <span>佩戴白魔专属圣物 (2121)</span>
                </label>
                <div class="text-[10px] text-cyan-400 mt-1">
                  生效状态: {{ mysidiaIsDiscountActive ? '✨ 治疗/复活 50% 折扣已激活' : '无魔导折减' }}
                </div>
              </div>

              <div class="space-y-1">
                <div class="text-gray-400 text-[10px] font-bold">目标当前生命值 (Target HP):</div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono text-amber-400 font-bold">{{ mysidiaTargetHp }} / 4000</span>
                </div>
                <input
                  type="range"
                  v-model.number="mysidiaTargetHp"
                  :min="0"
                  :max="4000"
                  :step="50"
                  class="w-full accent-purple-500 cursor-pointer mt-1"
                />
              </div>
            </div>

            <!-- 施法演算与消耗对比 -->
            <div class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div class="flex items-center gap-2">
                  <n-button size="small" type="primary" secondary @click="castMysidiaSpell">
                    🪄 执行施法结算 (Cast Magic)
                  </n-button>
                  <span class="text-xs text-gray-400">
                    实扣 MP: <strong class="text-cyan-400 font-mono text-sm">{{ mysidiaResolvedMpCost }} MP</strong>
                    <span v-if="mysidiaIsDiscountActive" class="text-emerald-400 text-[11px] ml-1">
                      (原标价 {{ mysidiaBaseMpCost }} MP 降 50%)
                    </span>
                  </span>
                </div>

                <div class="text-[11px] font-mono text-purple-300">
                  SQL规范检验: valid_entry() == true
                </div>
              </div>

              <!-- 施法结果展示卡 -->
              <div v-if="lastMysidiaCastResult" class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center pt-1">
                <div class="p-2 bg-slate-950 rounded border border-slate-800">
                  <div class="text-[10px] text-gray-400">实付 MP 扣除</div>
                  <div class="text-lg font-mono font-bold text-cyan-400">{{ lastMysidiaCastResult.mpCost }} MP</div>
                  <div class="text-[9px] text-gray-500">{{ lastMysidiaCastResult.mpDesc }}</div>
                </div>

                <div class="p-2 bg-slate-950 rounded border border-slate-800">
                  <div class="text-[10px] text-gray-400">秘术威力与效果</div>
                  <div class="text-lg font-mono font-bold" :class="lastMysidiaCastResult.success ? 'text-emerald-400' : 'text-rose-400'">
                    {{ lastMysidiaCastResult.effectText }}
                  </div>
                  <div class="text-[9px]" :class="lastMysidiaCastResult.success ? 'text-emerald-300' : 'text-rose-300'">
                    {{ lastMysidiaCastResult.effectDesc }}
                  </div>
                </div>

                <div class="p-2 bg-slate-950 rounded border border-slate-800">
                  <div class="text-[10px] text-gray-400">目标生命结算变动</div>
                  <div class="text-lg font-mono font-bold text-amber-400">
                    {{ lastMysidiaCastResult.targetHpText }}
                  </div>
                  <div class="text-[9px] text-gray-500">{{ lastMysidiaCastResult.targetHpDesc }}</div>
                </div>
              </div>

              <!-- 审计追踪 -->
              <div class="p-2 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono space-y-1">
                <div class="text-gray-500 font-bold">米西迪亚秘术生命周期审计 (Mysidia Magic Resolver Trace):</div>
                <div v-for="(log, idx) in mysidiaTraceLogs" :key="idx" class="text-purple-300 truncate">
                  &gt; {{ log }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </n-card>

      <!-- NG+ 多周目跃迁架构与继承预算推演台 (基于 new_game_plus.gd) -->
      <n-card hoverable class="border border-emerald-900/60 bg-[#091812]/90 rounded-xl md:col-span-2" title="🔄 NG+ 多周目跃迁架构与继承预算推演台 (New Game+ Inheritance Studio)">
        <div class="space-y-4 text-xs leading-relaxed">
          <p class="text-gray-300">
            对齐 Godot 引擎 <code>new_game_plus.gd</code> 实机规约：从已通关存档发起新周目跃迁，等级回到 Lv.1 (41HP/15MP)，完整继承职业熟练度 (JLV/JP/AP) 与已购魔法库，剧情道具安全注销 (保留力量护腕2125)，支持金币/代币平滑转接与梦魇难度挑战。
          </p>

          <!-- 核心三大架构设计 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-emerald-300 font-bold">⭐ 准入资格与事务备份防坏档:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>双星认证：</strong><code>clear_star == true</code> 且 <code>ng_plus_eligible == true</code>。</li>
                <li><strong>SAVEPOINT 安全保护：</strong>SQL 事务与 <code>player_magic.json</code> 预留回滚备份。</li>
                <li><strong>周目安全跃迁：</strong><code>cycle_index = cycle + 1</code>，防止大数溢出。</li>
              </ul>
            </div>

            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 基础重置与专属初始速度:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>基线数值：</strong>重置为 Lv.1, HP 41/41, MP 15/15, ATK 10, DEF 10, Spirit 10。</li>
                <li><strong>专属身手差异：</strong>纳哈特 12, 塞拉 10, 埃癸斯 9, 格雷夫 8, 索尔 7。</li>
                <li><strong>剧情道具清除：</strong>铜项链154与残卷清除，力量护腕2125沿装备库继承。</li>
              </ul>
            </div>

            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 职业极意与魔法全量保留:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>JLV/JP/AP 零抹除：</strong>各职业熟练度与已精通进度完整跨周目结转。</li>
                <li><strong>已购魔法免重购：</strong>白黑时全系已购法术直接在第一章即可调用。</li>
                <li><strong>梦魇模式 (Nightmare):</strong> 跃迁时可自选开启高难怪群修正。</li>
              </ul>
            </div>
          </div>

          <!-- 交互推演台: NG+ 周目跃迁试算 -->
          <div class="p-4 bg-slate-950/90 rounded-xl border border-emerald-700/40 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/30 pb-2">
              <div class="flex items-center gap-2">
                <span class="text-emerald-400 font-bold text-sm">🧪 NG+ 周目跃迁与通关继承推演台</span>
                <n-tag size="tiny" type="success" round>New Game+ Studio</n-tag>
              </div>
              <div class="flex items-center gap-2">
                <n-button size="tiny" secondary type="warning" @click="resetNgPlusStudio">
                  🔄 重置参数
                </n-button>
              </div>
            </div>

            <!-- 控制面板 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <div class="space-y-1">
                <div class="text-gray-400 text-[10px] font-bold">通关凭证状态 (Clear Certificate):</div>
                <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer mt-1">
                  <input type="checkbox" v-model="ngHasClearStar" />
                  <span>持有通关星标 (clear_star)</span>
                </label>
                <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                  <input type="checkbox" v-model="ngIsEligible" />
                  <span>拥有 NG+ 继承资质 (eligible)</span>
                </label>
              </div>

              <div class="space-y-1">
                <div class="text-gray-400 text-[10px] font-bold">当前周目与通关次数 (Cycle / Clears):</div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono text-cyan-400 font-bold">第 {{ ngCurrentCycle }} 周目 · {{ ngClearCount }} 次通关</span>
                </div>
                <div class="flex items-center gap-1 mt-1">
                  <n-button size="tiny" secondary @click="ngClearCount = Math.max(1, ngClearCount - 1); ngCurrentCycle = ngClearCount">-1</n-button>
                  <n-button size="tiny" secondary @click="ngClearCount += 1; ngCurrentCycle = ngClearCount">+1</n-button>
                </div>
              </div>

              <div class="space-y-1">
                <div class="text-gray-400 text-[10px] font-bold">携带金币与赌场代币 (Gold / Tokens):</div>
                <div class="text-xs font-mono text-amber-400 font-bold">{{ ngGold }} G · {{ ngTokens }} 代币</div>
                <div class="flex items-center gap-1 mt-1">
                  <n-button size="tiny" secondary @click="ngGold += 500">+500G</n-button>
                  <n-button size="tiny" secondary @click="ngTokens += 50">+50代币</n-button>
                </div>
              </div>

              <div class="space-y-1">
                <div class="text-gray-400 text-[10px] font-bold">周目跃迁挑战选择:</div>
                <label class="flex items-center gap-1.5 text-xs text-rose-300 cursor-pointer mt-1">
                  <input type="checkbox" v-model="ngNightmareMode" />
                  <span>开启【梦魇模式】(Nightmare Mode)</span>
                </label>
                <div class="text-[10px] text-gray-500">怪群强度拉升，全Boss附带二阶段狂暴</div>
              </div>
            </div>

            <!-- 执行跃迁 -->
            <div class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div class="flex items-center gap-2">
                  <n-button size="small" type="primary" secondary @click="executeNgPlusTransition">
                    🚀 发起周目跃迁 (Begin New Game+)
                  </n-button>
                  <span class="text-xs text-gray-400">
                    跃迁后周目: <strong class="text-emerald-400 font-mono text-sm">第 {{ ngCurrentCycle + 1 }} 周目</strong>
                  </span>
                </div>

                <div class="text-[11px] font-mono text-emerald-300">
                  SAVEPOINT: new_game_plus_start (受事务保护)
                </div>
              </div>

              <!-- 跃迁结算结果 -->
              <div v-if="lastNgPlusResult" class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center pt-1">
                <div class="p-2 bg-slate-950 rounded border border-slate-800">
                  <div class="text-[10px] text-gray-400">周目与通关状态</div>
                  <div class="text-lg font-mono font-bold" :class="lastNgPlusResult.success ? 'text-emerald-400' : 'text-rose-400'">
                    {{ lastNgPlusResult.cycleText }}
                  </div>
                  <div class="text-[9px] text-gray-500">{{ lastNgPlusResult.cycleDesc }}</div>
                </div>

                <div class="p-2 bg-slate-950 rounded border border-slate-800">
                  <div class="text-[10px] text-gray-400">队伍数值基线与速度</div>
                  <div class="text-lg font-mono font-bold text-cyan-400">{{ lastNgPlusResult.statsText }}</div>
                  <div class="text-[9px] text-cyan-300">{{ lastNgPlusResult.statsDesc }}</div>
                </div>

                <div class="p-2 bg-slate-950 rounded border border-slate-800">
                  <div class="text-[10px] text-gray-400">传承资产与难度模式</div>
                  <div class="text-lg font-mono font-bold text-amber-400">{{ lastNgPlusResult.assetsText }}</div>
                  <div class="text-[9px] text-amber-300">{{ lastNgPlusResult.assetsDesc }}</div>
                </div>
              </div>

              <!-- 审计追踪 -->
              <div class="p-2 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono space-y-1">
                <div class="text-gray-500 font-bold">多周目跃迁审计日志 (NewGamePlus Trace):</div>
                <div v-for="(log, idx) in ngPlusTraceLogs" :key="idx" class="text-emerald-300 truncate">
                  &gt; {{ log }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 探索菜单独立露营快捷管线与休整恢复架构 -->
      <n-card hoverable class="border border-emerald-900/60 bg-[#0a1c17]/90 rounded-xl md:col-span-2" title="⛺ 探索菜单独立露营快捷管线与休整恢复架构 (Dedicated Camping Shortcut)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            主菜单第 12 项指令全新实装【露营】专页（<code>CampPage</code>），专精野外行军扎营休整，深度结合场景安全许可与原子库存校验。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-emerald-300 font-bold">⭐ 第 12 核心主菜单指令:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>双列对称布局:</strong> 无缝填补第 6 行右侧槽位，完全保持主菜单原生面板尺寸。</li>
                <li><strong>零库存空态呈现:</strong> 队伍未携带扎营道具时安全展示空态，返回焦点优雅维持。</li>
                <li><strong>无缝场景过渡:</strong> 0.16 秒自然淡入淡出，不阻断底层逻辑输入监听。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 严格地理许可判据 (CampAccess):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>法定大地图许可:</strong> 仅在大地图（<code>world</code>）与鬼子岛法定光点激活。</li>
                <li><strong>迷宫城镇禁用:</strong> 普通洞窟、神殿与安全城镇自动置灰禁用，杜绝逻辑冲突。</li>
                <li><strong>纯函数边界判据:</strong> 鬼子岛特定光点精确核验坐标范围，防任意跨界滥用。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 原子休整与守恒机制:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>道具定向专精:</strong> 专精野营帐篷 (ID: 11) 与野营小屋 (ID: 21) 恢复逻辑。</li>
                <li><strong>按需使用不浪费:</strong> 队伍全员全健康且无异常时拒绝使用且不扣减道具。</li>
                <li><strong>全局状态守恒:</strong> 休整只变更当前生命/魔力与道具库存，全局状态机完全守恒。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 魔法列表原生双行属性标签架构 -->
      <n-card hoverable class="border border-sky-900/60 bg-[#0d1c29]/90 rounded-xl" title="✨ 魔法列表原生双行属性标签架构 (MagicElementLabel)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            法术选择对话框（<code>item_dialog_entries.gd</code>）与队伍菜单魔法页（<code>magic_page.gd</code>）全面统一规范，无缝接入官方属性提取器（<code>magic_element_label.gd</code>），实现跨场景属性高对比度双行呈现。
          </p>
          <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
            <div class="text-sky-300 font-bold">⭐ 核心技术规范与容错设计:</div>
            <ul class="list-disc list-inside text-gray-400 space-y-1">
              <li><strong>八大元素权威解析:</strong> 原生解析 <code>fire/ice/thunder/water/earth/wind/holy/dark</code> 映射为对应中文属性，空/<code>none</code> 显式标明“无属性”，不臆测未知属性。</li>
              <li><strong>双场景统一双行结构:</strong> 首行保留法术正式名称与 MP 消耗（或仅战斗可用状态），次行呈现 20px 高对比度属性行（<code>ElementLabel</code>），队伍菜单保持三列 84px 行高。</li>
              <li><strong>右侧费用列不动:</strong> 保持原有右侧 MP 消耗列对齐与几何尺寸，鼠标穿透（<code>MOUSE_FILTER_IGNORE</code>），不污染原有回传索引与 payload 字典。</li>
              <li><strong>法力不足同步置灰:</strong> 当角色 MP 不足或法术不可用时，属性标签与法术名称同步应用 <code>DISABLED_ENTRY_FONT_COLOR</code> 灰色状态。</li>
            </ul>
          </div>
        </div>
      </n-card>

      <!-- 队伍图鉴成就八琴演奏地点清单回顾架构 -->
      <n-card hoverable class="border border-violet-900/60 bg-[#140e2b]/90 rounded-xl" title="🎹 队伍图鉴成就八琴演奏地点清单回顾架构 (PianoRecordList / piano_record_data.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            队伍设置百科成就页（<code>settings_encyclopedia.gd</code>）升级为双列布局，左列 480px 维持总数与琴圣奖励，右列 470px 新增【钢琴演奏记录】只读滚动清单（<code>piano_record_list.gd</code> / <code>piano_record_data.gd</code>）。
          </p>
          <div class="p-3 bg-slate-900/80 rounded border border-violet-900/30 space-y-1">
            <div class="text-violet-300 font-bold">⭐ 核心技术规范与脱敏防剧透设计:</div>
            <ul class="list-disc list-inside text-gray-400 space-y-1">
              <li><strong>当前档 8 位掩码投影:</strong> 复用当前存档的 <code>visited_mask()</code>，严格按 1~8 号琴位索引投影，已演奏项高亮呈现（<code>Color("e0e0e0")</code>），未演奏项灰色呈现（<code>Color("8f96a6")</code>）。</li>
              <li><strong>数据层严密脱敏防剧透:</strong> 未演奏行底层数据结构完全不携带地图名称、地图 ID 或 tooltip，仅输出“d. 未发现钢琴”，从源头杜绝剧透。</li>
              <li><strong>纯只读与业务隔离:</strong> 界面操作纯只读，绝不调用演奏推进、到访写入或奖励下发，返回焦点与原按键链守恒。</li>
              <li><strong>生命周期全态守护:</strong> 隐藏即刻清空文本，切档、周目轮转、退出场景或祖先节点销毁时永久注销，杜绝旧文本残留复活。</li>
            </ul>
          </div>
        </div>
      </n-card>

      <!-- 队伍背包已持有道具名称实时搜索过滤架构 -->
      <n-card hoverable class="border border-emerald-900/60 bg-[#091a14]/90 rounded-xl md:col-span-2" title="🎒 队伍背包已持有道具名称实时搜索过滤架构 (ItemNameSearch / item_page.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            队伍菜单道具背包界面（<code>item_page.gd</code>）标题行右侧（<code>x:600, y:4, 568×44</code>）正式接入专属搜索栏组件（<code>ItemNameSearch / item_name_search.gd</code>），实现分类内正持有道具的实时模糊检索。
          </p>
          <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
            <div class="text-emerald-300 font-bold">⭐ 核心技术规范与交互安全机制:</div>
            <ul class="list-disc list-inside text-gray-400 space-y-1">
              <li><strong>当前分类正持有量严格过滤:</strong> 仅对当前选定分类下数量 &gt; 0 的已持有道具名称参与 64 字符模糊检索，不搜索未持有道具，从底层防范信息泄露。</li>
              <li><strong>键盘与手柄焦点平滑流转:</strong> 检索有匹配项时按 <code>Enter</code> 快速将焦点下沉至道具网格首项；按 <code>Esc</code> 或轻点右侧 <code>X</code> 按钮即刻清空查询并无缝还原当前分类全量列表。</li>
              <li><strong>零结果独立空态与防误触:</strong> 无匹配项时网格呈现“未找到已持有道具”空态提示并自动禁用【使用】与【丢弃】操作，编辑焦点仍留在输入框避免断流。</li>
              <li><strong>露营专页与整理合同保持:</strong> 露营子页（<code>camp_page.gd</code>）显式不挂载搜索框保持精炼；道具整理（Sort）保留查询文本即时重排，Use 与 Discard 契约完全守恒。</li>
            </ul>
          </div>
        </div>
      </n-card>

      <!-- 角色状态参数页当前防护详情只读架构 -->
      <n-card hoverable class="border border-amber-900/60 bg-[#17130b]/90 rounded-xl md:col-span-2" title="🛡️ 角色状态参数页当前防护详情只读架构 (StatusProtectionView / status_protection_data.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            队伍菜单角色状态参数界面（<code>status_page.gd</code>）底栏原空位正式接入【防护详情】（<code>ProtectionButton</code> / <code>status_protection_view.gd</code>），直接复用原刷新流程完成投影的当前角色本人数据，以 <code>1160×780</code> 暗金边框全景解析八大元素与明确异常抗性。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 八大元素四象防护归类:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>标准元素序列:</strong> 严格按 <code>火、冰、雷、水、土、风、光、暗</code> 8 列顺序输出。</li>
                <li><strong>抗性倍率映射:</strong> <code>&gt; 1</code> 判定为弱点、<code>== 0</code> 判定为免疫、<code>&lt; 0</code> 判定为吸收、<code>&lt; 1</code> 判定为抗性、默认展现普通。</li>
                <li><strong>坏值防护保障:</strong> 遇到非有限数值整份拒绝，绝不用假倍率掩盖不可信的防护。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 明确异常免疫中文白名单:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>全免疫快照标识:</strong> 存在 <code>*</code> 通配符时直接输出“全状态免疫”。</li>
                <li><strong>词条规范对齐:</strong> 汇聚战斗常量白名单，增补数据库标准【即死】、【减速】与学城课程规范词【急速】。</li>
                <li><strong>顿号分隔与无状态说明:</strong> 明确去重并以顿号 <code>、</code> 串联；空状态明确标明“无”。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-emerald-300 font-bold">⭐ 零二次计算与生命周期隔离:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>严守只读防重算:</strong> 绝不新增队伍 getter、战斗 Actor 或二次 apply 装备属性。</li>
                <li><strong>法定作用域明示:</strong> 面板底端标明“菜单基础与已穿装备防护，不包含战斗临时屏障、反射或闪避”。</li>
                <li><strong>状态变更安全撤回:</strong> 换人、切周目、场景注销或剧情事件变更时即刻失效快照，防旧数据残留。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 队伍菜单已学魔法名称实时搜索过滤架构 -->
      <n-card hoverable class="border border-sky-900/60 bg-[#091726]/90 rounded-xl md:col-span-2" title="🔮 队伍菜单已学魔法名称实时搜索过滤架构 (MagicNameSearch / magic_page.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            队伍菜单魔法专页（<code>magic_page.gd</code>）标题行右侧空位全新引入【魔法名称搜索】组件（<code>MagicNameSearch / magic_name_search.gd</code>），直接复用已学魔法资格访问器（<code>JobMagicAccess</code>），对当前分类下具备施法资格的魔法名称进行 64 字符实时检索。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-sky-300 font-bold">⭐ 当前分类与职业资格双重过滤:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>合资格已学魔法过滤:</strong> 仅在当前施法者职业合法且已习得的法术集合中检索，不跨分类不泄露未学法术。</li>
                <li><strong>跨分类保持与换人重置:</strong> 在白/黑/时/召唤等分类间切换时保留查询词，切换队伍施法者时自动清空。</li>
                <li><strong>清空与还原契约:</strong> 按 <code>Esc</code> 或轻点右侧 <code>X</code> 按钮即刻清空输入并完整恢复当前分类全部法术。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 目标选择与施法授权安全保护:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>施法选目标期间禁用搜索:</strong> 唤起目标选择界面时搜索框自动隐藏禁用，严守同一页面上下文的施法授权。</li>
                <li><strong>施法取消与成功保留状态:</strong> 无论施法成功扣减 MP 还是中途取消目标，均优雅保留搜索查询与键盘焦点。</li>
                <li><strong>零结果空态与防误触:</strong> 无匹配法术时呈现空态提示并禁用点击，光标保持在输入框中避免打断输入。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 既有视觉与排版 100% 守恒:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>三列 84px 行高保持:</strong> 保持原有网格几何规范，右侧 MP 消耗数值列穿透防误触。</li>
                <li><strong>原生双行属性标签守恒:</strong> 严格保留 <code>magic_element_label.gd</code> 高对比度双行属性呈现。</li>
                <li><strong>法力不足灰字联动:</strong> MP 不足或不可用法术保持 <code>DISABLED_ENTRY_FONT_COLOR</code> 禁用状态。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 队伍菜单装备名称实时搜索过滤架构 -->
      <n-card hoverable class="border border-emerald-900/60 bg-[#08201a]/90 rounded-xl md:col-span-2" title="🛡️ 队伍菜单装备候选名称搜索过滤架构 (EquipmentNameSearch / equipment_page.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            队伍菜单装备页（<code>equipment_page.gd</code>）新增【装备名称搜索】组件（<code>equipment_name_search.gd</code>），仅在当前部位已持有且当前角色可装备的候选中按名称检索，不扩大目录，不泄露未持有装备。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-emerald-300 font-bold">⭐ 检索范围与交互:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>仅缩小当前列表:</strong> 空查询保持原有灰项显示；输入后只匹配本部位持有且可装备的候选。</li>
                <li><strong>换人/换部位清空:</strong> 切换队员或点选新部位时自动清空查询。</li>
                <li><strong>Enter 聚焦首个结果:</strong> 回车仅将焦点移到首个可装备结果，“卸下”入口不充当零匹配默认确认。</li>
                <li><strong>零结果空态:</strong> 无匹配时显示“未找到可装备的名称”。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-teal-300 font-bold">⭐ 换装事务守卫不变:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>资格判断共用:</strong> 与实际换装共用 <code>can_equip_party_equipment</code>，界面不解锁职业、不卸下旧档已穿装备。</li>
                <li><strong>最强装备不受限:</strong> “最强”选择继续直接调用原 <code>_equip</code>，不受查询限制。</li>
                <li><strong>失效即撤销:</strong> 搜索控件失效时仅撤销查询展示，不触碰换装事务状态。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 队伍菜单能力页名称搜索架构 -->
      <n-card hoverable class="border border-violet-900/60 bg-[#150d24]/90 rounded-xl md:col-span-2" title="📜 队伍菜单能力列表名称搜索架构 (AbilityNameSearch / ability_page.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            队伍菜单能力页（<code>ability_page.gd</code>）标题行空位新增【能力名称搜索】（<code>ability_name_search.gd</code>，继承物品页固定身份输入），只筛当前角色下方原有可见能力列表，上方职业技摘要保持不变。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-violet-900/30 space-y-1">
              <div class="text-violet-300 font-bold">⭐ 检索与交互:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>沿原目录筛选:</strong> 沿用原 <code>_collect_entries</code>（职业等级/旗标、共享教学、本人精通与原魔法），只筛缓存临时数组，不重读角色、资格或 SQL。</li>
                <li><strong>清空与换人:</strong> 清空即恢复全部；切换角色自动清空查询；排序保留当前查询。</li>
                <li><strong>Enter 只聚焦结果:</strong> 回车仅把焦点移到结果查看原说明，空结果持续编辑，Esc 清空查询。</li>
                <li><strong>独立空态:</strong> 下方无匹配有独立提示，原空目录仍显示原有说明。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-violet-900/30 space-y-1">
              <div class="text-fuchsia-300 font-bold">⭐ 范围与守卫:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>仅查看:</strong> 不增加装备、遗忘、施放或新的持久化。</li>
                <li><strong>页面身份绑定:</strong> 输入额外绑定场景与祖先退场，旧的被筛掉按钮不能回填正文，退场后不能复活同一输入。</li>
                <li><strong>不换资格口径:</strong> 不改用魔法页的 SQL 教材资格。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 地图实时悬赏 HUD 与动态巡航标记系统 -->
      <n-card hoverable class="border border-amber-900/60 bg-[#1f160b]/90 rounded-xl md:col-span-2" title="🧭 地图实时悬赏 HUD 与动态巡航标记系统 (BountyTrackingHUD & Marker)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机大地图与地宫新增常驻独立悬赏巡航图层（<code>bounty_tracking_hud.gd</code> 与 <code>bounty_tracking_marker.gd</code>），挂载于 CanvasLayer 5，实现全 5 阶悬赏任务（Rank D/C/B/A/S）的实时方位导向与回访交接。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ HUD 架构与状态投影:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>讨伐态与领赏态自动流转:</strong> 未击破时自动指示混沌神殿对应专属怪坐标；击破后无缝平滑切至晨辉酒馆【悬赏领赏员】交还方位。</li>
                <li><strong>幂等安装与旧档隔离:</strong> 读档或换图时执行 <code>install</code> 检查，销毁已撤权旧实例，防止跨档幽灵 HUD。</li>
                <li><strong>非侵入式画布渲染:</strong> 标识节点挂载于地图 CanvasLayer，始终处于原生菜单与任务对话框层级下方，零点击穿透。</li>
                <li><strong>折叠展开交互:</strong> 仅记录当前地图阶段展开状态，切图与转场不持久化脏状态。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-yellow-300 font-bold">⭐ 纯读门禁守卫:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>对话与移动锁定规避:</strong> 对话激活、菜单呼出或转场黑屏期间自动休眠，解除后瞬时重连。</li>
                <li><strong>三旗真布尔强校验:</strong> 严格读取 <code>accept_flag</code> / <code>victory_flag</code> / <code>complete_flag</code> 真实布尔类型，坏档整数不投影。</li>
                <li><strong>活来源验证:</strong> 仅当控制器 <code>_current()</code> 且宿主未锁定时授标，伪冒替身自动剥夺标记。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 酒馆微醺醒酒步距与情报点单体系 -->
      <n-card hoverable class="border border-sky-900/60 bg-[#0d1827]/90 rounded-xl md:col-span-2" title="🍺 酒馆微醺醒酒步距与怪物属性情报点单系统 (TavernIntelSystem)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            晨辉王城酒馆新增点单交互与醒酒步距物理仿真体系（<code>tavern_ale_order.gd</code> 与 <code>tavern_stout_order.gd</code>），提供淡麦酒石径路线与矮人黑啤怪物元素属性情报。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-sky-300 font-bold">⭐ 清冽淡麦酒 (10G) 与微醺步距:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>微醺与醉酒状态阶梯:</strong> 1～2 杯微醺、3 杯起醉酒，每次饮酒重置 30 步实际有效移动醒酒步距。</li>
                <li><strong>物理步距严谨判定:</strong> 静止、原地撞墙或对话锁定不计步；离开酒馆瞬时清醒，醉意不写入存档。</li>
                <li><strong>视觉动效尊重设置:</strong> 晃动动效遵从玩家全局震动开关，关闭时不展示醉步与色散。</li>
                <li><strong>已购情报回看:</strong> 购买后在原地理卷酒馆详情可免费回看始源神殿石径提示。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 矮人黑啤 (50G) 与属性情报浏览器:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>元素倍率深度情报:</strong> 购买解锁沼泽洞窟绿色粘液怪弱点与全元素承伤倍率。</li>
                <li><strong>常驻情报浏览器:</strong> 购买后在酒馆常驻 <code>tavern_monster_intel_browser.gd</code> 免费重读，永久免付费。</li>
                <li><strong>金币门禁与事务安全:</strong> 不足 50G 确认按钮自动禁用；取消或外部切图永久安全销毁订单。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 存档备份与字段预检系统架构 -->
      <n-card hoverable class="border border-teal-900/60 bg-[#081e1e]/90 rounded-xl md:col-span-2" title="🛡️ 外部存档备份字段预检与完整性自检系统 (SaveBackupInspection / save_backup_inspection.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            新增独立外部存档安全自检入口（<code>save_backup_inspection.gd</code> 与 <code>save_backup_inspection_ui.gd</code>），在玩家恢复备份或导入多槽位快照前执行非侵入式字段预检，杜绝坏档、死档与篡改污染。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-teal-900/30 space-y-1">
              <div class="text-teal-300 font-bold">⭐ 零写入安全防线:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>8 MiB 文件体积上限保护:</strong> 限制入口解析体积不超过 8 MiB，防止超大异常文件内存耗尽。</li>
                <li><strong>检查前后双哈希校验:</strong> 读取前后对比二进制指纹（<code>before.bytes == after.bytes</code>），文件变动即时阻断。</li>
                <li><strong>纯读无副作用:</strong> 仅执行字段预检，不调用任何底层导入、恢复或持久化 API，当前活跃存档不受影响。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-teal-900/30 space-y-1">
              <div class="text-emerald-300 font-bold">⭐ 分页投影与整单把关:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>分页无损预览:</strong> 每页投影 5 份存档条目，支持翻页查阅角色属性、章节与时间戳。</li>
                <li><strong>整单整份拒绝策略:</strong> 一旦发现任意记录字段不合格，整份文件全部拒绝，防止残留破损槽位。</li>
                <li><strong>容量门禁显式告警:</strong> 超出 30 份上限的记录明确提示不进入列表，清晰明了。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 悬赏奖励装备瞬时假设对照系统 -->
      <n-card hoverable class="border border-indigo-900/60 bg-[#12132b]/90 rounded-xl md:col-span-2" title="⚔️ 悬赏奖励神装瞬时假设对照系统 (BountyRewardEquipmentCompare)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            晨辉酒馆领赏前新增瞬时对照服务（<code>bounty_reward_equipment_compare.gd</code>），在不入包、不穿戴、不初始化角色实体的前提下，为在控队员生成奖励神装与当前穿戴的数值对照。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-indigo-900/30 space-y-1">
              <div class="text-indigo-300 font-bold">⭐ 瞬时假设特性:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>仅借正式 Offer 比较:</strong> 仅根据领赏清单 ID 解析槽位与属性，假设替换右手武器与防具。</li>
                <li><strong>严格操控交集:</strong> 仅提取当前真正受控的在编队员，拒收非法数据与坏类型。</li>
                <li><strong>双持基底无损保留:</strong> 完整复制 <code>_dual_wield_base</code>，兼顾忍者双持与单手武器对比精度。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-indigo-900/30 space-y-1">
              <div class="text-blue-300 font-bold">⭐ 架构与边界安全:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>容量独立模型:</strong> 与 <code>bounty_reward_capacity_model.gd</code> 配合，有容量才发放，容量不足保留待领。</li>
                <li><strong>无状态泄漏:</strong> 对照完成后瞬时释放 RefCounted 对象，无全局引用滞留。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 全队装备预设方案与快照切换体系 -->
      <n-card hoverable class="border border-orange-900/60 bg-[#1e1509]/90 rounded-xl md:col-span-2" title="🎽 全队装备预设方案与快照切换体系 (EquipmentPresets / equipment_presets.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机队伍菜单与装备管理正式实装多预设方案架构（<code>equipment_presets.gd</code> 与 <code>equipment_preset_panel.gd</code>），每位在控角色拥有 3 份独立配装方案，实现一键捕获、差值对比与安全应用。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-orange-900/30 space-y-1">
              <div class="text-orange-300 font-bold">⭐ 方案契约与六槽规范:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>固定 3 份方案容量:</strong> 每位角色（nahart, sera, aegis, grave, sol）固定分配 3 份方案槽位。</li>
                <li><strong>六大合法槽位绑定:</strong> 覆盖 weapon, offhand_weapon, shield, head, armor, accessory。</li>
                <li><strong>快照捕获 (Capture):</strong> 仅捕获当前真实穿戴装备 ID，不根据高亮候选或显示总值倒推。</li>
                <li><strong>缺件容错与校验:</strong> 允许方案中保留当前背包暂时缺席的合法 ID，应用时显式提示缺件并拒绝违规穿戴。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-orange-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 差值演算与穿戴安全:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>预设对比 (Preview Diff):</strong> 应用前调用 <code>COMPARE</code> 计算攻防敏数值涨跌与属性变化。</li>
                <li><strong>职业规则共用守卫:</strong> 严格遵守各职业装备资质，忍者双持与盾牌槽位逻辑互斥守恒。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 魔法教材来源透视与共享/个人学习溯源体系 -->
      <n-card hoverable class="border border-cyan-900/60 bg-[#0a1827]/90 rounded-xl md:col-span-2" title="✨ 魔法教材来源透视与学习溯源体系 (MagicUILearningSource / magic_ui_learning_source.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            魔法详情页新增只读教材来源溯源组件（<code>magic_ui_learning_source.gd</code>），精准区分队伍共享教材与个人专精魔法，明确展示职业施法资格。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-cyan-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 双轨教材溯源:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>队伍共享教材（已取得）:</strong> 查验 <code>player_magic</code> 购买状态，只要队伍习得，符合职业的角色均可调配。</li>
                <li><strong>本人教材（已启用）:</strong> 查验 <code>character_magic</code> 角色专属魔法槽，记录个人专属觉醒特技。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-cyan-900/30 space-y-1">
              <div class="text-sky-300 font-bold">⭐ 纯读与职业资格解释:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>职业资格动态解释:</strong> 结合角色当前职业解释施法权，杜绝职业不符时的错误引导。</li>
                <li><strong>无状态副作用:</strong> 纯读 SQLite 数据库，不修改魔法槽位或消耗道具。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 职业特技解锁入列资格判读架构 -->
      <n-card hoverable class="border border-blue-900/60 bg-[#09172e]/90 rounded-xl md:col-span-2" title="📜 职业特技解锁与战斗入列资格判读架构 (JobSkillDescriptionEligibility)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机职业页面新增特技解锁与入列判据组件（<code>job_skill_description_eligibility.gd</code> 与 <code>job_skill_description_view.gd</code>），精确向玩家说明特技是否真正入列当前战斗快捷队列。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-blue-900/30 space-y-1">
              <div class="text-blue-300 font-bold">⭐ 入列三要素审查:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>当前任职硬性约束:</strong> 仅当队员当前真正任职此职业时才允许入列，未任职者清晰标明“当前未任此职业”。</li>
                <li><strong>JLV 阶梯门禁:</strong> 严格比对本人职业 JLV 记录，未达到需求等级时显示“尚需 JLV X”。</li>
                <li><strong>剧情传承旗标校验:</strong> 涉及时空主线或秘传特技时比对 <code>required_story_flag</code>，缺旗显示“尚缺额外剧情传承”。</li>
                <li><strong>主动战斗特技过滤:</strong> 明确区分常驻被动与战斗入列指令，非战斗指令不作为主动战斗特技入列。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-blue-900/30 space-y-1">
              <div class="text-sky-300 font-bold">⭐ 纯读无副作用保证:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>不调用补全履历方法:</strong> 拒读会触发自动补全或改写存档的队伍视图，杜绝坏记录自动合法化。</li>
                <li><strong>隔离多来源技能:</strong> 仅取当前职业目录来源，不混入全队教学或精通继承的同 ID 技能。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 道具使用对象与环境许可智能摘要系统 -->
      <n-card hoverable class="border border-emerald-900/60 bg-[#0a1e16]/90 rounded-xl md:col-span-2" title="🎒 道具使用对象与环境许可智能摘要系统 (ItemUIUseSummary / item_ui_use_summary.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            道具菜单（<code>item_page.gd</code>）接入使用合同动态摘要组件（<code>item_ui_use_summary.gd</code>），只读解析道具目标对象与场景使用许可。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-emerald-300 font-bold">⭐ 智能目标与环境判定:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>重要道具保护:</strong> <code>category == important</code> 明确提示“重要道具 · 不能直接使用或丢弃”。</li>
                <li><strong>休息道具宿营许可:</strong> 帐篷与小屋道具依据 <code>camp_allowed</code> 区分“使用对象：当前全队”与“休息道具 · 无法在此使用”。</li>
                <li><strong>菜单可用性拦截:</strong> 仅在战斗中使用的道具显示“无法在菜单中使用”。</li>
                <li><strong>单体与全体目标回退:</strong> 全体道具显示“使用对象：当前全队”，单体道具高亮指向当前选定队员或首人。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-teal-300 font-bold">⭐ 无损阅读合同:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>不预试算恢复量:</strong> 不虚构推算 HP/MP 恢复量或随机范围，避免因抗性浮动产生误导。</li>
                <li><strong>不消费道具:</strong> 仅生成阅读提示字符串，不扣减道具数量或触发任何行动状态机。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 大地图区域百科拓扑与双界调色板视图架构 -->
      <n-card hoverable class="border border-purple-900/60 bg-[#160d29]/90 rounded-xl md:col-span-2" title="🗺️ 大地图区域百科拓扑与双界调色板视图架构 (EncyclopediaRegionView / encyclopedia_region_view.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机大地图百科系统（<code>encyclopedia_region_view.gd</code> 与 <code>settings_encyclopedia.gd</code>）提供非侵入式区域风土多边形预览画布，实现地形拓扑与多入口漫游导航。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-purple-900/30 space-y-1">
              <div class="text-purple-300 font-bold">⭐ 地形要素与双界渲染:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>精确海岸多边形:</strong> 严格读取世界地图 JSON 海岸水域多边形，不破坏底层共享数据。</li>
                <li><strong>山脉森林古道网格:</strong> 矢量化渲染连绵山岳、茂密丛林与主干大道矩形区域。</li>
                <li><strong>双界调色板切换:</strong> 根据 <code>is_dark</code> 切换光之界明亮风与暗之界虚无逆转调色方案。</li>
                <li><strong>多入口巡回 (Entrance Cycling):</strong> 支持前一个/后一个入口一键漫游居中对焦。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-purple-900/30 space-y-1">
              <div class="text-fuchsia-300 font-bold">⭐ 零实体与手势防线:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>纯画布变换:</strong> 绝不生成探索场景、主相机节点、玩家实体或输入控制器，零性能开销。</li>
                <li><strong>手势严格作用域:</strong> 页面隐藏、失焦或配置刷新时瞬时释放拖拽状态，防卡死防串键。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 魔物已击败快照已知招式白名单解析系统 -->
      <n-card hoverable class="border border-rose-900/60 bg-[#1e0d16]/90 rounded-xl md:col-span-2" title="👾 魔物已击败快照已知招式白名单解析系统 (MonsterKnownMoves / monster_known_moves.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机图鉴百科新增已知基础招式解析服务（<code>monster_known_moves.gd</code> 与 <code>monster_known_moves_view.gd</code>），直接解析已击败快照中的无条件基础招式，规范招式类型与展示格式。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-rose-900/30 space-y-1">
              <div class="text-rose-300 font-bold">⭐ 招式分类与白名单过滤:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>四维基础类别分类:</strong> 涵盖 <code>physical</code> (物理招式)、<code>magic</code> (魔法招式)、<code>mp_drain</code> (MP吸收招式)、<code>status</code> (状态招式)。</li>
                <li><strong>严格参数键审查:</strong> 针对不同类型仅接受正式参数（如物理 multiplier/critical、魔法 power/magic_id、状态 duration），非白名单条件键一律拒收。</li>
                <li><strong>同名同型智能去重:</strong> 相同类型与招式名合并去重展示，提供清爽高对比度查阅面板。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-rose-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 权威安全防线:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>不推测下一招行为:</strong> 绝不执行内部怪物 AI 步进，不输出出招概率、伤害浮动或未触发状态。</li>
                <li><strong>零隐藏字段泄漏:</strong> 隐蔽资源路径、内部脚本键名与战斗系统私有状态严格屏蔽，只向玩家呈现正式名称与招式归类。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 道具菜单目标同伴快速切换架构 -->
      <n-card hoverable class="border border-teal-900/60 bg-[#091e1d]/90 rounded-xl md:col-span-2" title="🔄 道具菜单目标同伴快捷切换架构 (ItemUITargetSwitch / item_ui_target_switch.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机道具菜单（<code>item_page.gd</code>）在标题右侧接入目标快速轮换控制器（<code>item_ui_target_switch.gd</code>），实现“上一位 / 下一位”同伴快速循环，提升批量补给效率。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-teal-900/30 space-y-1">
              <div class="text-teal-300 font-bold">⭐ 选人票据与修订版本防线:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>修订版本戳 (Revision Stamp):</strong> 记录 <code>_stamp</code> 并在名单/道具/选择变动时递增 <code>_revision</code>，使旧按钮回调永久失效，杜绝跨步错选。</li>
                <li><strong>单体与全体智能切换:</strong> 单体道具激活切换按钮，全体道具与不可用道具自动隐藏/禁用。</li>
                <li><strong>原生主题与尺寸对齐:</strong> 沿用 <code>PartyMenuChrome</code> 原生 16px 按钮几何规范，两端对称布局。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-teal-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 零持久化安全原则:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>仅写原菜单选择:</strong> 显式切换仅调用原菜单选人逻辑，不创建新选人场景，不补运行态。</li>
                <li><strong>退役后彻底销毁:</strong> 页面退场时解除绑定，字段不进入存档，无静态滞留。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 北窟三层地貌拓扑与安全出生点系统 -->
      <n-card hoverable class="border border-sky-900/60 bg-[#0a1829]/90 rounded-xl md:col-span-2" title="🏔️ 北窟三层路线环境与安全出生点系统 (NorthCaveRouteTopology)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机北窟地下城全面实装路线环境拓扑组件（<code>north_cave_route_environment.gd</code>、<code>corridor</code> 与 <code>crystal</code>），统一底层碰撞与出生标定。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-sky-300 font-bold">⭐ 三层地下拓扑连贯性:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>北窟一层风口 (north_cave):</strong> 静态层材质沿用，自动隐藏旧“未接”方向文字，保持视线清爽。</li>
                <li><strong>北窟二层回廊 (north_cave_corridor):</strong> 连通暗道与宝藏狭间，多点位坐标严格对齐。</li>
                <li><strong>北窟三层晶腔 (north_cave_crystal):</strong> 深层水晶祭坛核心，地表与碰撞物理层守恒。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-blue-300 font-bold">⭐ 安全落脚点审查 (Safe Foot):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>非法坐标校验:</strong> 跨图传送时严格验证 <code>safe_foot</code>，遇坏坐标自动回退本层基准出生点，杜绝穿墙落空。</li>
                <li><strong>非破坏性构建:</strong> 不移除 marker 节点或缩放角色碰撞体，保持原生移动阻挡一致。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 北窟双向门禁与原场景景物调查系统 -->
      <n-card hoverable class="border border-indigo-900/60 bg-[#0b1026]/90 rounded-xl md:col-span-2" title="🏛️ 北窟双向门禁与原场景景物调查系统 (NorthCaveRoute & NorthCaveSites)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机北窟核心路线（<code>north_cave_route.gd</code>）与景物调查系统（<code>north_cave_sites.gd</code>）构筑了受控地下网络，覆盖全套相邻门禁验证、主线节拍解锁与纯读景物交互。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-indigo-900/30 space-y-1">
              <div class="text-indigo-300 font-bold">⭐ 双向门禁与节拍解禁守卫:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>解禁节拍 GATE_BEAT (ch02_restore_trust):</strong> 严格要求完成龙骑士第 2 章任务【重拾信任】，未满足则阻断世界入口。</li>
                <li><strong>受控相邻跃迁 (Strict Adjacent Transition):</strong> 仅允许 1F↔2F、2F↔3F 双向相邻门禁通行，非法跨层或伪造目的地直接熔断。</li>
                <li><strong>大地图自动门几何避让:</strong> 世界返场点 (1200, 268) 严格调校，避让旧北脊关 (<code>loc_north_pass</code>) 32px 自动门重叠触发圆。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-indigo-900/30 space-y-1">
              <div class="text-teal-300 font-bold">⭐ 原场景景物纯读交互 (NorthCaveSites):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>三处核心景物石刻:</strong> <code>ice_wind_crevice</code> (风口石刻)、<code>corridor_fragment_stone</code> (回廊铭文) 与 <code>polar_crystal_core</code> (晶腔核心)。</li>
                <li><strong>四重纯读安全核验:</strong> 交互时严格检查宿主节点 host、当前剧情图 story_map、活体队伍 active_party 与周目 cycle_index，不匹配直接拒绝。</li>
                <li><strong>零副作用零污染:</strong> 交互仅展示沉浸式风土文本，不写 SQL、不改角色属性、不创建多余持久化字段。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 大陆·北境通路查询模型与动态准入投影架构 -->
      <n-card hoverable class="border border-sky-900/60 bg-[#071326]/90 rounded-xl md:col-span-2" title="🌐 大陆·北境通路查询模型与动态准入投影架构 (NorthernRouteQueryModel / northern_route_query_model.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机大地图引入 <code>NorthernRouteQueryModel</code>，负责统一查询并向玩家呈现北境 9 大开放通路与 4 大大陆根入口（冰河洞窟、山脊坑道、北脊关与北窟）的实时门户连接与返回向导。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-sky-300 font-bold">⭐ 9大白名单地图与等级准入:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>九大白名单区域 (IDS):</strong> 严格限定 <code>glacial_cave (1~3)</code>、<code>ridge_tunnel (1~2)</code>、<code>north_pass</code> 与 <code>north_cave (1~3)</code>，拒绝非白名单候选房间。</li>
                <li><strong>队伍等级准入过滤:</strong> 提取前五人等级 <code>party_projection()</code> 配合 <code>POLICY.evaluate(level_range)</code> 严格审查，未满足开放或等级条件的区域静默隐藏。</li>
                <li><strong>现场物理 Area 验证:</strong> 大陆入口必须具有可见、启用的碰撞体并匹配 <code>click_move_portal</code> 标记；东口严格匹配 <code>RidgeTunnelSites</code> 实例。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 弱引用票据与状态自毁 (Ticket Life-Cycle):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>快照票据捕获 (capture):</strong> 采用弱引用 (<code>WeakRef</code>) 绑定 Host 与 Player，记录 <code>owner</code>、<code>cycle</code> 与 <code>party</code>。</li>
                <li><strong>多重安全断路器:</strong> 遇切图、转场过渡 (<code>_is_transitioning</code>)、暂停、进入战斗、打开剧情对话时，即刻标记 <code>revoked=true</code> 阻断旧视图。</li>
                <li><strong>零超游零传送:</strong> 仅生成正式门户的有向指引文本，不提供跨图直传能力，杜绝穿透地形规则破坏探索体验。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 全域可选地图持久化扩充与北窟三层存档安全体系 -->
      <n-card hoverable class="border border-emerald-900/60 bg-[#071b16]/90 rounded-xl md:col-span-2" title="💾 全域可选地图持久化扩充与北窟三层存档安全体系 (GameStateSave & StoryMapScene)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机持久化引擎（<code>game_state_save.gd</code>）与剧情探索场景宿主（<code>story_map_scene.gd</code>）将受管辖的正式可选地宫扩展至 24 处全矩阵，北窟三层正式获得全套断点恢复与现场保存能力。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-emerald-300 font-bold">⭐ 24 处可选地宫现场存档准入 (can_save_progress):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>现场坐标恢复 (_uses_saved_cave_position):</strong> 涵盖北窟三层、冰河三层、山脊双孔、雷鸣三层等 24 处地图，读档精准复原合法在场脚点。</li>
                <li><strong>全生命周期安全锁:</strong> 严格检查 <code>optional_route_is_open</code>、未处于探索切图加载锁、未处于战斗切入状态且非过渡态。</li>
                <li><strong>附加读档格式审查 (_valid_optional_map_payload):</strong> 读档时不重新闯关解禁节拍，但严格校验有限脚点与步进模式，杜绝脏档回填。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-emerald-900/30 space-y-1">
              <div class="text-teal-300 font-bold">⭐ 场景宿主弱引用生命周期观察器 (StoryMapScene):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>实体绑定 (_bind_north_cave_source):</strong> 角色实体建立后一次性绑定 <code>_north_cave_source_owner</code>、<code>cycle</code> 与 Player 弱引用。</li>
                <li><strong>多事件响应退役 (_observe_north_cave_source):</strong> 监听 <code>story_changed</code>、<code>inventory_changed</code> 与 <code>mode_changed</code>，遇换周目或换档即刻标记 <code>retired=true</code>。</li>
                <li><strong>零内存泄漏守卫:</strong> 场景退出树 (<code>tree_exiting</code>) 彻底切断连接，杜绝悬挂回调，保障单机长时间连续游玩的稳定性。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 悬赏奖励装备替换对象透视与结构化拒绝原因架构 -->
      <n-card hoverable class="border border-amber-900/60 bg-[#1f1709]/90 rounded-xl md:col-span-2" title="⚖️ 悬赏奖励装备替换对象透视与结构化拒绝原因架构 (BountyRewardEquipmentCompare & EquipmentComparison)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机悬赏奖励快速预览模块（<code>bounty_reward_equipment_compare.gd</code>）与通用装备对比器（<code>equipment_comparison.gd</code>）联动，支持被替换对象透视、同件/空槽识别及结构化不可用原因提示。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 替换对象识别 (replacement_text):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>单槽位精准映射:</strong> 读取当前同伴正式槽位装备 ID 与名称，生成「当前 [槽位]：[装备A] ➔ 假设替换为：[奖励B]」。</li>
                <li><strong>空槽与同件感知:</strong> 未装备时标明「空槽」；已装备同名装备时注明「当前已装备同件；本次假设不额外叠加」。</li>
                <li><strong>武器右手主槽位约定:</strong> 奖励单件武器固定假设替换右手主槽，副手逐手结算不强制叠加。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-rose-300 font-bold">⭐ 结构化拒绝原因 (REASON_TEXT):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>权威原因枚举映射:</strong> 当对比状态为 <code>unavailable</code> 时，读取 <code>COMPARE.REASON_TEXT[key]</code> 确切输出冲突（如双手武器持有时副手盾冲突、职业不可穿戴等）。</li>
                <li><strong>只读无副作用:</strong> 纯计算投影，描述标明「未领取、未穿戴」，不触发人物初始化、不改背囊、不执行装备穿脱。</li>
                <li><strong>快照票据防御:</strong> 弱引用当前队伍容器与周目，一旦发生数据变动即刻失效旧票据。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 北窟门户安全会话与转场事务回滚系统 -->
      <n-card hoverable class="border border-sky-900/60 bg-[#09182b]/90 rounded-xl md:col-span-2" title="🌀 北窟门户安全会话与转场事务回滚系统 (NorthCaveVisit / north_cave_visit.gd)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机大地图与北窟三层之间装配专属门户访问状态机（<code>north_cave_visit.gd</code>），实现强指纹物理门禁校验、单次消费令牌与切图失败安全回滚。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-sky-300 font-bold">⭐ 物理指纹校验与防重放令牌:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>碰撞体完整指纹:</strong> 门禁必须是宿主同名子节点，具备启用状态的 <code>CircleShape2D</code>（严格 32px 半径）并附带 <code>click_move_portal</code> 标记。</li>
                <li><strong>单次单序号令牌 (capture/consume):</strong> 递增序号 <code>_serial</code> 签发本地 ticket，消费时校验并即刻清空，彻底杜绝切图令牌重放漏洞。</li>
                <li><strong>对话/过渡态门禁:</strong> 处于剧情对话（<code>Dialogic</code>）或地图转场中时拒绝授标，阻断临时并发穿透。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-sky-900/30 space-y-1">
              <div class="text-teal-300 font-bold">⭐ 失败回滚事务 (begin_transfer/rollback):</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>四项快照镜像备份:</strong> 转场前备份 <code>current_story_map_id</code>、<code>cave_player_position</code>、<code>world_player_position</code> 与 <code>menu_return_scene_path</code>。</li>
                <li><strong>异常自动平滑恢复:</strong> 遇加载失败（<code>change_failed</code>）且未被外部篡改时，精确回滚四项状态并重置 <code>_is_transitioning = false</code>。</li>
                <li><strong>退出树安全退役:</strong> 宿主或 Player 节点触发 <code>tree_exiting</code> 时，即刻退役所有门户记录并销毁未完成凭证。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 魔物基础招式记载全息面板与模态焦点安全隔离 -->
      <n-card hoverable class="border border-purple-900/60 bg-[#160d2b]/90 rounded-xl md:col-span-2" title="📖 魔物基础招式记载全息面板与模态焦点安全隔离 (MonsterKnownMovesView & SettingsEncyclopedia)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机怪物百科（<code>settings_encyclopedia.gd</code>）在详情卡片下方集成「基础招式记载」按钮（<code>KnownMovesButton</code>），并挂载独立模态面板（<code>monster_known_moves_view.gd</code>）。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-purple-900/30 space-y-1">
              <div class="text-purple-300 font-bold">⭐ 独占模态视窗与输入遮罩:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>底层控件遮蔽 (_covered.hide()):</strong> 模态打开时强制隐藏底层 <code>DetailCard</code>、<code>DetailNav</code> 与 <code>BottomBar</code>，彻底屏蔽旧按钮误触。</li>
                <li><strong>独立暗金视窗与滚动交互:</strong> 采用 <code>dark-gold-panel-frame</code> 全屏暗金边框，<code>MovesScroll</code> 支持滚轮与手柄上下键（±48px）顺滑滚动。</li>
                <li><strong>返回快捷键捕获 (_input):</strong> 支持 <code>ui_cancel</code> 快捷键或点击「返回当前详情」优雅退出，事件标记 handled。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-purple-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 弱引用票据与焦点恢复断路器:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>身份一致性校验 (_source_ticket):</strong> 绑定魔物 ID、<code>GameState.party_runtime</code>、<code>bestiary_records</code>、快照数据与周目编号。</li>
                <li><strong>焦点恢复与安全回退:</strong> 主动退出且票据未过期时安全归还焦点至原按钮；若遇数据过期或换档，平滑回退至列表视图，绝不误授焦点。</li>
                <li><strong>零伪造零预测:</strong> 仅列本档正式收录配置中的无条件基础招式，不承诺施放概率或下一招预测。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 王冠之托史诗任务链与会话票据安全核验架构 -->
      <n-card hoverable class="border border-amber-900/60 bg-[#1a1208]/90 rounded-xl md:col-span-2" title="👑 王冠之托史诗任务链与会话票据安全核验架构 (FF1CrownQuest & ExplorationObjectives)">
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            实机任务管线（<code>ff1_crown_quest.gd</code>）负责推进西方王城「王冠之托与神秘钥匙」史诗支线（<code>exploration_objectives.json:143–160</code>），横跨八张地图实现四阶实物交换闭环与异步对白生命周期安全守卫。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-amber-300 font-bold">⭐ 四阶实物链条与八图物语:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>四阶闭环交换:</strong> 111 王冠（沼泽洞窟拾回）➔ 112 水晶眼（归还玛托雅女巫）➔ 113 苏醒药（唤醒沉睡精灵王子）➔ 114 神秘钥匙（<code>ff1_mystic_key</code>）。</li>
                <li><strong>八张关联地图联动:</strong> 覆盖西方王城、沼泽洞窟地下一层、玛托雅洞窟、精灵城堡与全域封印宝库。</li>
                <li><strong>单次发放严格守卫:</strong> 严查背包容量，无容量保留待领，绝不重复发放钥匙或替换既有装备。</li>
              </ul>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-amber-900/30 space-y-1">
              <div class="text-cyan-300 font-bold">⭐ 对白异步结束票据安全断路器:</div>
              <ul class="list-disc list-inside text-gray-400 space-y-1">
                <li><strong>会话身份冻结:</strong> 打开国王对话前冻结原 <code>party_owner</code>、<code>cycle</code>、<code>tree</code>、<code>current_scene</code>、Story 来源与 <code>_open_generation</code>。</li>
                <li><strong>对白代次锁严格审查:</strong> 对话自然结束时必须精确满足 <code>dialogue.get('_open_generation') == request.generation + 1</code> 且未处于 <code>is_active()</code>，阻断重复重入。</li>
                <li><strong>排队删除与换档拦截:</strong> 核验 <code>_exchange_host_live(host)</code>，宿主及祖先未处于 <code>is_queued_for_deletion</code>，彻底阻断向新周目/新队伍补接取。</li>
                <li><strong>取消操作纯读回退:</strong> Esc 或主动取消对话仅退出会话，不写接取旗标（<code>ff1_crown_accepted</code>），保持存档纯净。</li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// ================= 冒险情报手册会话模拟器 (Adventure Intel Session & Reading Model) =================
const intelFlags = reactive({
  tavern_ale_read: true,
  tavern_stout_read: false
})

const activeOwner = ref('party_slot_1_hero')
const activeCycle = ref(1)
const activeQuery = ref('')
const selectedLocation = ref('all')
const selectedSection = ref('all')
const selectedEntryId = ref('tavern_ale_read')
const sessionLog = ref<string[]>([
  '初始载入：活跃队伍 [party_slot_1_hero]，周目 [Cycle 1]，已记忆麦酒情报阅读位置。'
])

const allIntelDatabase = [
  {
    id: 'tavern_ale_read',
    title: '始源神殿石径路线',
    location: '晨辉酒馆 · 晨辉郊外',
    cost: '10 G (麦酒 Ale)',
    detail: '穿过晨辉森林东北侧小径，即可抵达被结界封印的始源神殿。石径两侧生长着微光荧草，夜晚可作为辨路标识。注意：沿途暗伏低级哥布林斥候。'
  },
  {
    id: 'tavern_stout_read',
    title: '绿色粘液怪元素倍率与生理弱点',
    location: '晨辉酒馆 · 沼泽洞窟',
    cost: '25 G (黑啤 Stout)',
    sections: [
      { id: 'all', title: '全部全貌' },
      { id: 'weakness', title: '🔥 元素弱点克制' },
      { id: 'phys_res', title: '🛡️ 物理减伤机制' },
      { id: 'ai_pattern', title: '⚡ 行动与附着模式' }
    ],
    details: {
      all: '绿色粘液怪（Green Slime）常年滋生于潮湿阴暗的沼泽洞窟。拥有极高物理抗性与极度怕火特性，遭遇时切忌盲目物理平砍。',
      weakness: '【属性弱点】：火属性伤害享受 2.0x 暴击伤害倍率；雷属性造成 1.0x 基础伤害；水/冰属性造成 0.5x 减免伤害。',
      phys_res: '【物理减伤】：常驻 0.2x 极高物理减伤（仅承受 20% 物理攻击伤害），普通刀剑砍击极难破防，需破甲特技或火系魔导术。',
      ai_pattern: '【行动模式】：ATB 充满时倾向于释放「毒液喷溅」（40% 几率附加中毒状态）与「粘性纠缠」（降低我方角色 20% 行动速度持续 3 回合）。'
    }
  }
]

const availableLocations = computed(() => {
  const locs = new Set<string>()
  allIntelDatabase.forEach(item => {
    if (intelFlags[item.id as keyof typeof intelFlags]) {
      locs.add(item.location)
    }
  })
  return ['all', ...Array.from(locs)]
})

const filteredIntelList = computed(() => {
  return allIntelDatabase.filter(item => {
    // 1. 严格购旗验证 (_purchased)
    if (!intelFlags[item.id as keyof typeof intelFlags]) return false
    // 2. 地点过滤
    if (selectedLocation.value !== 'all' && item.location !== selectedLocation.value) return false
    // 3. 搜索匹配
    if (activeQuery.value.trim()) {
      const q = activeQuery.value.trim().toLowerCase()
      const matchTitle = item.title.toLowerCase().includes(q)
      const matchLoc = item.location.toLowerCase().includes(q)
      if (!matchTitle && !matchLoc) return false
    }
    return true
  })
})

const activeIntelEntry = computed(() => {
  return filteredIntelList.value.find(i => i.id === selectedEntryId.value) || filteredIntelList.value[0] || null
})

const sectionOptions = computed(() => {
  if (!activeIntelEntry.value || activeIntelEntry.value.id !== 'tavern_stout_read') {
    return [{ id: 'all', title: '全部' }]
  }
  return (activeIntelEntry.value as any).sections || [{ id: 'all', title: '全部' }]
})

const displayContent = computed(() => {
  if (!activeIntelEntry.value) return '未找到匹配的已购情报或当前分类下无条目。'
  if (activeIntelEntry.value.id === 'tavern_stout_read') {
    const sec = selectedSection.value
    const details = (activeIntelEntry.value as any).details as Record<string, string>
    return details[sec] || details['all']
  }
  return activeIntelEntry.value.detail
})

const triggerInvalidation = (reason: string) => {
  sessionLog.value.unshift(`🚨 触发会话失效 [${reason}]：调用 forget() 清空阅读位置记忆、详情滚动槽与章节上下文。`)
  selectedSection.value = 'all'
  if (sessionLog.value.length > 5) sessionLog.value.pop()
}

const simulateSwitchSave = () => {
  activeOwner.value = activeOwner.value === 'party_slot_1_hero' ? 'party_slot_2_alt' : 'party_slot_1_hero'
  triggerInvalidation('切换存档队伍所有者 (Owner Invalidation)')
}

const simulateSwitchCycle = () => {
  activeCycle.value = activeCycle.value === 1 ? 2 : 1
  triggerInvalidation('周目跃迁 (Cycle Invalidation)')
}

// ================= 酒馆微醺状态机与步数醒酒模拟器 (Tavern Buzz State Simulator) =================
const buzzGold = ref(50)
const buzzCups = ref(0)
const buzzWalkedPixels = ref(0)
const buzzStrength = ref(0)
const buzzPhase = ref<'Sober' | 'LightBuzz' | 'Drunk' | 'Sobering'>('Sober')
const buzzLog = ref<string[]>([
  '进入晨辉酒馆：清醒状态 (Sober)，步距 0px，无晃动，滤镜强度 0.00。'
])
const STEP_LENGTH = 28 // 28px 一步
const SOBER_STEPS = 30 // 30 步清醒 (840px)
const SOBER_PIXELS = SOBER_STEPS * STEP_LENGTH

// 计算步数
const buzzSteps = computed(() => Math.floor(buzzWalkedPixels.value / STEP_LENGTH))

// 屏幕晃动位移 (sway_pixels)
const buzzSway = computed(() => {
  const steps = buzzSteps.value
  if (steps < 3 || buzzPhase.value !== 'Drunk') return 0
  const dir = Math.floor(steps / 3) % 2 === 1 ? 4 : -4
  return Number((dir * buzzStrength.value).toFixed(2))
})

// 模拟买酒再来一杯 (purchase)
const buyDrink = () => {
  if (buzzGold.value < 10) {
    buzzLog.value.unshift('❌ 再来一杯需10G。金币不足，未收取金币。')
    if (buzzLog.value.length > 6) buzzLog.value.pop()
    return
  }
  buzzGold.value -= 10
  buzzCups.value += 1
  buzzWalkedPixels.value = 0 // 重置醒酒步距
  if (buzzCups.value < 3) {
    buzzPhase.value = 'LightBuzz'
    buzzStrength.value = 0
  } else {
    buzzPhase.value = 'Drunk'
    buzzStrength.value = 1.0 // Drunk 阶段 strength 趋近于 1.0
  }
  buzzLog.value.unshift(`🍺 购买「再来一杯」已付10G (剩余 ${buzzGold.value}G)！当前累计: ${buzzCups.value} 杯，阶段: ${buzzPhase.value === 'LightBuzz' ? '微醺 (LightBuzz)' : '酩酊大醉 (Drunk)'}。`)
  if (buzzLog.value.length > 6) buzzLog.value.pop()
}

// 模拟行走位移 (travel)
const walkSteps = (steps: number) => {
  if (buzzPhase.value !== 'LightBuzz' && buzzPhase.value !== 'Drunk') {
    buzzLog.value.unshift(`🚶 行走了 ${steps} 步 (${steps * STEP_LENGTH}px)，当前为清醒状态，无需醒酒。`)
    if (buzzLog.value.length > 6) buzzLog.value.pop()
    return
  }
  const addedPx = steps * STEP_LENGTH
  buzzWalkedPixels.value += addedPx
  if (buzzWalkedPixels.value >= SOBER_PIXELS) {
    buzzCups.value = 0
    buzzPhase.value = 'Sobering'
    buzzStrength.value = 0
    buzzPhase.value = 'Sober'
    buzzLog.value.unshift(`✨ 走完了 ${buzzSteps.value} 步 (累计 ${buzzWalkedPixels.value}px >= 840px)，完全清醒！杯数清零，滤镜与晃动消退。`)
  } else {
    buzzLog.value.unshift(`🚶 移动 ${steps} 步 (累计 ${buzzSteps.value}/30 步, ${buzzWalkedPixels.value}/${SOBER_PIXELS}px)。当前晃动: ${buzzSway.value}px。`)
  }
  if (buzzLog.value.length > 6) buzzLog.value.pop()
}

// 离开酒馆清理退役 (_retire)
const leaveTavern = () => {
  buzzCups.value = 0
  buzzWalkedPixels.value = 0
  buzzPhase.value = 'Sober'
  buzzStrength.value = 0
  buzzLog.value.unshift('🚪 离开酒馆切图退役 (_retire)：TavernBuzzEffect 销毁，非持久化状态重置，零存档污染。')
  if (buzzLog.value.length > 6) buzzLog.value.pop()
}

// ================= 米西迪亚五大秘术与白魔专属魔导消耗折减架构 (mysidia_magic_effects.gd / personal_magic_cost.gd) =================
const selectedMysidiaSpell = ref('mysidia_arise')
const mysidiaTargetIsFriend = ref(true)
const mysidiaIsBossEncounter = ref(false)
const mysidiaHasItem2121 = ref(true)
const mysidiaTargetHp = ref(1200)

const mysidiaSpellOptions = [
  { label: 'mysidia_arise (米西迪亚全复活 · 白魔法Lv6 · 60 MP · 满血复苏)', value: 'mysidia_arise' },
  { label: 'mysidia_firaga (米西迪亚爆炎 · 黑魔法Lv5 · 40 MP · 威力240 火)', value: 'mysidia_firaga' },
  { label: 'mysidia_blizzaga (米西迪亚爆雪 · 黑魔法Lv5 · 40 MP · 威力240 冰)', value: 'mysidia_blizzaga' },
  { label: 'mysidia_hastega (米西迪亚全域强加速 · 时魔导Lv5 · 30 MP · +50% ATB速率)', value: 'mysidia_hastega' },
  { label: 'mysidia_gravity (米西迪亚重力术 · 时魔导Lv5 · 24 MP · 削减25%当前生命)', value: 'mysidia_gravity' },
  { label: 'cura (中级治疗术 · 常规白魔法Lv3 · 16 MP · 友方回复)', value: 'cura' },
  { label: 'curaga (高级治疗术 · 常规白魔法Lv5 · 32 MP · 友方巨额回复)', value: 'curaga' }
]

interface MysidiaSpellMeta {
  baseCost: number
  isHealingOrLife: boolean
  element: string
  power: number
  targetSide: 'friend' | 'enemy'
}

const mysidiaSpellMetas: Record<string, MysidiaSpellMeta> = {
  mysidia_arise: { baseCost: 60, isHealingOrLife: true, element: 'holy', power: 0, targetSide: 'friend' },
  mysidia_firaga: { baseCost: 40, isHealingOrLife: false, element: 'fire', power: 240, targetSide: 'enemy' },
  mysidia_blizzaga: { baseCost: 40, isHealingOrLife: false, element: 'ice', power: 240, targetSide: 'enemy' },
  mysidia_hastega: { baseCost: 30, isHealingOrLife: false, element: '', power: 0, targetSide: 'friend' },
  mysidia_gravity: { baseCost: 24, isHealingOrLife: false, element: '', power: 0, targetSide: 'enemy' },
  cura: { baseCost: 16, isHealingOrLife: true, element: 'holy', power: 120, targetSide: 'friend' },
  curaga: { baseCost: 32, isHealingOrLife: true, element: 'holy', power: 260, targetSide: 'friend' }
}

const mysidiaBaseMpCost = computed(() => {
  return mysidiaSpellMetas[selectedMysidiaSpell.value]?.baseCost || 0
})

const mysidiaIsDiscountActive = computed(() => {
  const meta = mysidiaSpellMetas[selectedMysidiaSpell.value]
  if (!meta) return false
  // personal_magic_cost.gd 判定：持有 2121 圣物 + 治疗/复活白名单 + 目标为友方同伴 (TEAM_PARTY)
  return mysidiaHasItem2121.value && meta.isHealingOrLife && mysidiaTargetIsFriend.value
})

const mysidiaResolvedMpCost = computed(() => {
  const base = mysidiaBaseMpCost.value
  if (!mysidiaIsDiscountActive.value) return base
  // maxi(1, ceili(float(canonical_cost) * 0.5))
  return Math.max(1, Math.ceil(base * 0.5))
})

interface MysidiaCastResult {
  mpCost: number
  mpDesc: string
  success: boolean
  effectText: string
  effectDesc: string
  targetHpText: string
  targetHpDesc: string
}

const lastMysidiaCastResult = ref<MysidiaCastResult | null>(null)
const mysidiaTraceLogs = ref<string[]>([
  '系统就绪: mysidia_magic_effects.gd 与 personal_magic_cost.gd 规范加载完成',
  '契约守卫: Item 2121 专享 50% 治疗折减，重力术严格排斥 Boss 战与免疫目标'
])

const castMysidiaSpell = () => {
  const spell = selectedMysidiaSpell.value
  const cost = mysidiaResolvedMpCost.value
  const discountActive = mysidiaIsDiscountActive.value

  let success = true
  let effectText = '施法成功'
  let effectDesc = ''
  let targetHpText = `${mysidiaTargetHp.value} HP`
  let targetHpDesc = '无生命变动'

  if (spell === 'mysidia_gravity') {
    // 重力术判定：非 Boss 战且非 Boss 随从
    if (mysidiaIsBossEncounter.value) {
      success = false
      effectText = '⛔ 重力术免疫生效'
      effectDesc = 'Boss 战遭遇中敌人持有 instant_death/gravity 免疫，伤害强制为 0'
      targetHpText = `${mysidiaTargetHp.value} HP (无伤)`
      targetHpDesc = '根据 gravity_amount() 规约：遭遇 context.is_boss 触发熔断保护'
      mysidiaTraceLogs.value.unshift(`[施法拦截] mysidia_gravity 遭遇 context.is_boss == true，重力削弱归零`)
    } else {
      // 正常减免当前生命的 25%: mini(target.hp - 1, floori(float(target.hp) * 0.25))
      const loss = Math.min(Math.max(0, mysidiaTargetHp.value - 1), Math.floor(mysidiaTargetHp.value * 0.25))
      const newHp = Math.max(1, mysidiaTargetHp.value - loss)
      effectText = `🔻 削减 ${loss} HP (25%)`
      effectDesc = '重力术命中：按目标当前生命值百分比完成 1/4 重力塌陷'
      targetHpText = `${mysidiaTargetHp.value} ➔ ${newHp} HP`
      targetHpDesc = `削减 ${loss} 点生命值，剩余 ${newHp} HP`
      mysidiaTargetHp.value = newHp
      mysidiaTraceLogs.value.unshift(`[重力命中] mysidia_gravity 削减 ${loss} HP (原 ${mysidiaTargetHp.value + loss} ➔ 现 ${newHp})`)
    }
  } else if (spell === 'mysidia_arise') {
    if (!mysidiaTargetIsFriend.value) {
      success = false
      effectText = '⚠️ 阵营不匹配'
      effectDesc = 'mysidia_arise 规约要求 allowed_sides: "friend"，无法对敌施放'
      mysidiaTraceLogs.value.unshift(`[施法异常] mysidia_arise 目标非友方，判定驳回`)
    } else {
      effectText = '🌟 100% 满生命起死回生'
      effectDesc = '米西迪亚全复活：目标完全复苏并回复至最大生命值'
      targetHpText = `${mysidiaTargetHp.value} ➔ 4000 HP`
      targetHpDesc = '满血复原 (Revive 100%)'
      mysidiaTargetHp.value = 4000
      mysidiaTraceLogs.value.unshift(`[全复活] mysidia_arise 触发：友方目标直接复苏满血 (4000 HP)`)
    }
  } else if (spell === 'mysidia_firaga' || spell === 'mysidia_blizzaga') {
    const isFire = spell === 'mysidia_firaga'
    const elemName = isFire ? '火' : '冰'
    const dmg = Math.floor(Math.random() * 80) + 760
    const newHp = Math.max(0, mysidiaTargetHp.value - dmg)
    effectText = `💥 ${dmg} 点 ${elemName} 属性魔法伤害`
    effectDesc = `米西迪亚爆${isFire ? '炎' : '雪'} (Power 240, can_multi: 1)`
    targetHpText = `${mysidiaTargetHp.value} ➔ ${newHp} HP`
    targetHpDesc = newHp === 0 ? '💀 目标生命耗尽已倒下' : `受创损耗 ${dmg} HP`
    mysidiaTargetHp.value = newHp
    mysidiaTraceLogs.value.unshift(`[法术输出] ${spell} 威力 240 轰击敌人，造成 ${dmg} 点 ${elemName} 伤`)
  } else if (spell === 'mysidia_hastega') {
    effectText = '⚡ 全员加速 +50%'
    effectDesc = 'mysidia_party_haste: 全体存活友方 ATB 充能速率拉升 1.5 倍'
    targetHpText = `${mysidiaTargetHp.value} HP`
    targetHpDesc = '状态加持 (ATB Speed 150%)'
    mysidiaTraceLogs.value.unshift(`[加速光环] mysidia_hastega 激活：全体同伴 ATB 充能提速 +50%`)
  } else {
    // 常规治疗
    const heal = spell === 'curaga' ? 1200 : 500
    const newHp = Math.min(4000, mysidiaTargetHp.value + heal)
    effectText = `💚 回复 +${heal} HP`
    effectDesc = `白魔法治疗：目标生命获得充沛滋养`
    targetHpText = `${mysidiaTargetHp.value} ➔ ${newHp} HP`
    targetHpDesc = `回复生命 ${heal} 点`
    mysidiaTargetHp.value = newHp
    mysidiaTraceLogs.value.unshift(`[治疗生效] ${spell} 为友方恢复 ${heal} HP`)
  }

  // 审计日志维持最大 8 条
  if (mysidiaTraceLogs.value.length > 8) {
    mysidiaTraceLogs.value = mysidiaTraceLogs.value.slice(0, 8)
  }

  lastMysidiaCastResult.value = {
    mpCost: cost,
    mpDesc: discountActive ? `Item 2121 折减: ${mysidiaBaseMpCost.value} ➔ ${cost} MP` : `原标价扣除: ${cost} MP`,
    success,
    effectText,
    effectDesc,
    targetHpText,
    targetHpDesc
  }
}

const resetMysidiaStudio = () => {
  selectedMysidiaSpell.value = 'mysidia_arise'
  mysidiaTargetIsFriend.value = true
  mysidiaIsBossEncounter.value = false
  mysidiaHasItem2121.value = true
  mysidiaTargetHp.value = 1200
  lastMysidiaCastResult.value = null
  mysidiaTraceLogs.value = [
    '重置完成: 米西迪亚秘术演练台已恢复初始状态',
    '默认设置: mysidia_arise, 友方目标, 佩戴 Item 2121 白魔圣物'
  ]
}

// ================= NG+ 多周目跃迁架构与继承预算推演台 (new_game_plus.gd) =================
const ngHasClearStar = ref(true)
const ngIsEligible = ref(true)
const ngCurrentCycle = ref(1)
const ngClearCount = ref(1)
const ngGold = ref(2400)
const ngTokens = ref(120)
const ngNightmareMode = ref(false)

interface NgPlusResult {
  success: boolean
  cycleText: string
  cycleDesc: string
  statsText: string
  statsDesc: string
  assetsText: string
  assetsDesc: string
}

const lastNgPlusResult = ref<NgPlusResult | null>(null)
const ngPlusTraceLogs = ref<string[]>([
  '系统就绪: new_game_plus.gd 跃迁模型加载完成',
  '契约守卫: 双星认证 (clear_star + eligible)、属性基准重置、职业与已购魔法全量结转'
])

const executeNgPlusTransition = () => {
  if (!ngHasClearStar.value || !ngIsEligible.value) {
    ngPlusTraceLogs.value.unshift('[跃迁驳回] 存档未满足双星认证 (clear_star == true && ng_plus_eligible == true)')
    lastNgPlusResult.value = {
      success: false,
      cycleText: '资格校验受阻',
      cycleDesc: '当前存档不具备 NG+ 资格，请先击败最终首领生成通关凭证',
      statsText: '维持现状',
      statsDesc: '未执行 SQL 属性重置',
      assetsText: '无资产转移',
      assetsDesc: '未写入周目资产预算'
    }
    return
  }

  const nextCycle = ngCurrentCycle.value + 1
  ngCurrentCycle.value = nextCycle
  ngClearCount.value += 1

  ngPlusTraceLogs.value.unshift(`[周目跃迁] 成功跃迁至第 ${nextCycle} 周目！SAVEPOINT 释放，职业/魔法历史继承完成`)
  ngPlusTraceLogs.value.unshift('[属性重置] 全员归零至 Lv.1 (HP 41/MP 15)，速度基线赋予：纳12 塞10 埃9 格8 索7')
  ngPlusTraceLogs.value.unshift(`[剧情收回] 铜项链154/残卷注销，力量护腕2125保留，金币结转 ${ngGold.value}G`)

  if (ngPlusTraceLogs.value.length > 8) {
    ngPlusTraceLogs.value = ngPlusTraceLogs.value.slice(0, 8)
  }

  lastNgPlusResult.value = {
    success: true,
    cycleText: `第 ${nextCycle} 周目 (${ngNightmareMode.value ? '梦魇模式' : '常规模式'})`,
    cycleDesc: `累计通关 ${ngClearCount.value} 次，已更新 cycle_index = ${nextCycle}`,
    statsText: 'Lv.1 (41HP/15MP)',
    statsDesc: '保留全职业熟练度 (JLV/JP/AP) 与已学魔法库',
    assetsText: `${ngGold.value}G + ${ngTokens.value} 代币`,
    assetsDesc: '继承金币/代币，重要装备沿用，关键剧情任务重置'
  }
}

const resetNgPlusStudio = () => {
  ngHasClearStar.value = true
  ngIsEligible.value = true
  ngCurrentCycle.value = 1
  ngClearCount.value = 1
  ngGold.value = 2400
  ngTokens.value = 120
  ngNightmareMode.value = false
  lastNgPlusResult.value = null
  ngPlusTraceLogs.value = [
    '重置完成: NG+ 演练台恢复初始参数',
    '默认设置: 第 1 周目通关档，拥有通关星标与 NG+ 资格'
  ]
}

// ================= ⚙️ Godot 4.6 LTS 引擎子系统与性能工坊 (engine_subsystem_orchestrator.gd / audio_dsp_bus_matrix.gd) =================
interface FrameMetrics {
  logic: number
  physics: number
  render: number
  audio: number
}

const frameMetrics = ref<FrameMetrics>({
  logic: 2.1,
  physics: 1.4,
  render: 4.8,
  audio: 0.6
})

const isSimStress = ref(false)

const totalFrameMs = computed(() => {
  return frameMetrics.value.logic + frameMetrics.value.physics + frameMetrics.value.render + frameMetrics.value.audio
})

const currentFps = computed(() => {
  const ms = Math.max(1, totalFrameMs.value)
  return Math.min(144, Math.round(1000 / ms))
})

const frameHealthMessage = computed(() => {
  if (totalFrameMs.value > 16.6) {
    return '⚠️ 帧预算超载！当前帧耗时超过 16.6ms 门槛，引擎分帧削峰器 (TimeSlicer) 已介入降频。'
  }
  const headroom = (16.6 - totalFrameMs.value).toFixed(1)
  return `✅ 帧预算余量充沛：尚有 ${headroom}ms VSync 闲置缓冲，稳定输出 60 FPS！`
})

const toggleStressSimulation = () => {
  isSimStress.value = !isSimStress.value
  if (isSimStress.value) {
    frameMetrics.value = {
      logic: 5.8,
      physics: 4.2,
      render: 8.9,
      audio: 1.2
    }
    engineAuditLog.value = '[高压负载注入] 模拟 100 个敌方同屏 + 全屏粒子核爆，DrawCalls 飙升至 450+！'
  } else {
    resetEngineStudio()
  }
}

// 5路音频总线与DSP调谐
interface DspPreset {
  id: string
  name: string
  icon: string
  cutoff: number
  master: number
  bgm: number
}

const dspPresets: DspPreset[] = [
  { id: 'normal', name: '大地图常规原野', icon: '🌲', cutoff: 20000, master: 0, bgm: 0 },
  { id: 'menu_pause', name: '菜单暂停 800Hz 滤波', icon: '⏸️', cutoff: 800, master: 0, bgm: -4 },
  { id: 'cave_reverb', name: '沉没塔深海卷积混响', icon: '🌊', cutoff: 3500, master: 2, bgm: -2 },
  { id: 'battle_fade', name: '战前等功率交叉淡化', icon: '⚔️', cutoff: 15000, master: 0, bgm: -6 }
]

const activeDspPresetId = ref('normal')
const masterVolume = ref(0)
const bgmVolume = ref(0)
const lowPassCutoff = ref(20000)
const dspStatusEcho = ref('就绪：全频放行，Master 总线 0 dB，BGM 总线 0 dB。')
const engineAuditLog = ref('Godot 4.6 LTS 架构拓扑调度器就绪: engine_subsystem_orchestrator.gd')

const applyDspPreset = (presetId: string) => {
  activeDspPresetId.value = presetId
  const p = dspPresets.find(pr => pr.id === presetId)!
  lowPassCutoff.value = p.cutoff
  masterVolume.value = p.master
  bgmVolume.value = p.bgm
  if (p.cutoff <= 1000) {
    dspStatusEcho.value = `[DSP低通激活] 800Hz 低通生效，高频泛音截断，模拟菜单阻隔氛围。`
  } else if (presetId === 'cave_reverb') {
    dspStatusEcho.value = `[卷积混响] 湿音比率提升 35%，激活湿润石壁声学反射。`
  } else {
    dspStatusEcho.value = `[常规声场] 音频总线恢复平坦直通输出。`
  }
  engineAuditLog.value = `[音频总线切换] 载入预设: ${p.name} (audio_dsp_bus_matrix.gd)`
}

const resetEngineStudio = () => {
  isSimStress.value = false
  frameMetrics.value = {
    logic: 2.1,
    physics: 1.4,
    render: 4.8,
    audio: 0.6
  }
  applyDspPreset('normal')
  engineAuditLog.value = '引擎拓扑与性能分帧调度器已恢复基准出厂配置。'
}
</script>
