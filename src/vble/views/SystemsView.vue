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
// 系统底层架构无需复杂动态响应，纯配置与说明展示
</script>
