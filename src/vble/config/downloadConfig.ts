/**
 * 游戏客户端下载中心配置
 * 汇集百度网盘、123云盘、阿里云盘、夸克网盘四大渠道与解压安装指引
 */

export interface DownloadChannel {
  id: string
  name: string
  badge: string
  badgeType: 'success' | 'warning' | 'info' | 'error'
  icon: string
  color: string
  url: string
  code: string
  hasCode: boolean
  speedTip: string
  features: string[]
  recommended?: boolean
}

export const GAME_DOWNLOAD_INFO = {
  title: '最终幻想：时空之轮 (FF Chrono Twilight)',
  subtitle: '双月宇宙 RPG · 客户端下载渠道与运行指引',
  version: 'v2.2.0（原页面记录，包版本待核实）',
  updateDate: '2026-10-21',
  releaseStatus: '项目仍在开发，完整游戏尚未完成验收。网盘包的版本、大小与内容范围待核实，请以分享页和包内说明为准。',
  packageSize: '约 1.25 GB（原页面记录，待核实）',
  engine: 'Godot 4.6 (Offline Standalone Engine)',
  osRequirements: 'Windows 10 / 11 (x64) · macOS 12+ (Apple Silicon / Intel) · Steam Deck',
  hardwareMin: 'CPU: 双核 2.0GHz / 内存: 4GB / 显卡: 支持 DirectX 11 / OpenGL 3.3',
  hardwareRec: 'CPU: 四核 2.8GHz / 内存: 8GB / 显卡: GTX 1050 或同等性能集成显卡',
  saveStorage: '存档恢复能力以所下载版本为准，请保留独立备份',
  antiAddictionCADPA: 'CADPA 12+ 适龄提示'
}

export const DOWNLOAD_CHANNELS: DownloadChannel[] = [
  {
    id: '123pan',
    name: '123云盘 (推荐)',
    badge: '免登录不限速',
    badgeType: 'success',
    icon: '⚡',
    color: '#0284c7',
    url: 'https://1813374361.share.123pan.cn/123pan/N2SUVv-H7zHd?pwd=MV4y#',
    code: 'MV4y',
    hasCode: true,
    speedTip: '推荐首选！浏览器直接点击即可享受高速下载，无需强制安装客户端',
    features: ['免登录直接下载', '满速带宽直连', '支持多线程下载器'],
    recommended: true
  },
  {
    id: 'baidu',
    name: '百度网盘',
    badge: '主流大盘',
    badgeType: 'info',
    icon: '🟢',
    color: '#2563eb',
    url: 'https://pan.baidu.com/s/1PPoD7w_BGI0sOBPxQ_AeYQ?pwd=6y4w',
    code: '6y4w',
    hasCode: true,
    speedTip: '支持转存到百度网盘个人账号，适合已有百度网盘 SVIP 用户极速下载',
    features: ['永久有效转存', '手机/PC客户端无缝', '支持离线下载'],
    recommended: false
  },
  {
    id: 'alipan',
    name: '阿里云盘',
    badge: '极速转存',
    badgeType: 'warning',
    icon: '🚀',
    color: '#ea580c',
    url: 'https://www.alipan.com/s/eQq9Hzqs1nU',
    code: '无需提取码',
    hasCode: false,
    speedTip: '支持原画极速转存，阿里官方高速通道，无需手动输入提取码',
    features: ['无提取码直达', '高速不限速转存', '支持多端设备同步'],
    recommended: false
  },
  {
    id: 'quark',
    name: '夸克网盘',
    badge: '手机极速',
    badgeType: 'error',
    icon: '🌀',
    color: '#7c3aed',
    url: 'https://pan.quark.cn/s/1bd4068fbd0c',
    code: 'SVKa',
    hasCode: true,
    speedTip: '夸克 APP 移动端极速下载通道，支持大文件一键极速解压转存',
    features: ['移动端极速友好', '大容量空间转存', '夸克客户端高速加速'],
    recommended: false
  }
]

export const INSTALL_STEPS = [
  {
    step: '1',
    title: '核对网盘文件信息',
    desc: '先查看网盘分享页的文件名、版本和大小，再选择适合的渠道。登录、客户端和速度限制以网盘当前规则为准。'
  },
  {
    step: '2',
    title: '解压至本地全英文目录',
    desc: '使用 7-Zip 或 WinRAR 等解压软件，将压缩包解压至任意全英文路径（例如 D:\\Games\\ChronoTwilight\\），避免中文路径产生字符转义异常。'
  },
  {
    step: '3',
    title: '直接双击启动游戏',
    desc: '按包内说明启动对应系统的程序；可玩章节、职业与功能范围以所下载版本为准。'
  },
  {
    step: '4',
    title: '离线单机 · 畅享游戏',
    desc: '游戏按离线单机方向开发；网盘下载可能需要联网或登录。存档恢复能力以所下载版本为准，请保留独立备份。'
  }
]

/** 生成一键复制分享给玩家/群聊的完整分享文案 */
export const generateShareText = (): string => {
  return `【客户端下载渠道】${GAME_DOWNLOAD_INFO.title}
${GAME_DOWNLOAD_INFO.releaseStatus}
原页面版本记录：${GAME_DOWNLOAD_INFO.version}
原页面大小记录：${GAME_DOWNLOAD_INFO.packageSize}

📥 四个网盘下载渠道（请先核对文件信息）：

1. 【123云盘】:
链接：https://1813374361.share.123pan.cn/123pan/N2SUVv-H7zHd?pwd=MV4y#
提取码：MV4y

2. 【百度网盘】:
链接：https://pan.baidu.com/s/1PPoD7w_BGI0sOBPxQ_AeYQ?pwd=6y4w
提取码：6y4w

3. 【阿里云盘】(无需提取码):
链接：https://www.alipan.com/s/eQq9Hzqs1nU

4. 【夸克网盘】:
链接：https://pan.quark.cn/s/1bd4068fbd0c
提取码：SVKa

提示：登录、客户端与速度限制以网盘当前规则为准；运行方式及内容范围以包内说明为准，存档请保留独立备份。`
}
