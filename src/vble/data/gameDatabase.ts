// TypeScript Game Database Module
// 最终幻想：时空之轮 - 全景项目真实数据库导出
export const GAME_DATABASE = {
  monsters: [
  {
    "id": "forest_wolf",
    "name": "林地野狼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 1,
    "hp": 28,
    "mp": 0,
    "attack": 10,
    "defense": 4,
    "magic_attack": 10,
    "magic_defense": 4,
    "speed": 8,
    "exp": 12,
    "gold": 10,
    "drops": [
      {
        "name": "狼皮",
        "rate": "35%"
      },
      {
        "name": "恢复药",
        "rate": "35%"
      }
    ],
    "skills": [
      "咆哮",
      "撕咬"
    ],
    "weakness": "fire",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "killer_bee",
    "name": "杀人毒蜂",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "avis",
    "raceText": "飞行系",
    "level": 1,
    "hp": 18,
    "mp": 0,
    "attack": 8,
    "defense": 2,
    "magic_attack": 8,
    "magic_defense": 2,
    "speed": 12,
    "exp": 10,
    "gold": 15,
    "drops": [
      {
        "name": "蜂毒针",
        "rate": "35%"
      },
      {
        "name": "解毒草",
        "rate": "35%"
      }
    ],
    "skills": [
      "毒针"
    ],
    "weakness": "fire",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "goblin",
    "name": "林间哥布林",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "humanoid",
    "raceText": "人形系",
    "level": 2,
    "hp": 35,
    "mp": 0,
    "attack": 11,
    "defense": 5,
    "magic_attack": 11,
    "magic_defense": 5,
    "speed": 6,
    "exp": 16,
    "gold": 25,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "wyvern_whelp",
    "name": "岭地飞龙幼体",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "avis",
    "raceText": "飞行系",
    "level": 7,
    "hp": 95,
    "mp": 0,
    "attack": 22,
    "defense": 10,
    "magic_attack": 22,
    "magic_defense": 10,
    "speed": 14,
    "exp": 40,
    "gold": 50,
    "drops": [
      {
        "name": "飞龙鳞片",
        "rate": "35%"
      },
      {
        "name": "帐篷",
        "rate": "12%"
      }
    ],
    "skills": [
      "小火球"
    ],
    "weakness": "ice、wind",
    "location": "龙栖岭 & 裂谷要道"
  },
  {
    "id": "mist_grizzly",
    "name": "迷雾巨熊",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 10,
    "hp": 160,
    "mp": 0,
    "attack": 30,
    "defense": 14,
    "magic_attack": 30,
    "magic_defense": 14,
    "speed": 7,
    "exp": 60,
    "gold": 80,
    "drops": [
      {
        "name": "熊胆",
        "rate": "35%"
      },
      {
        "name": "高级恢复药",
        "rate": "12%"
      }
    ],
    "skills": [
      "重击"
    ],
    "weakness": "fire",
    "location": "迷雾森林 & 灵木神庙"
  },
  {
    "id": "wood_spirit",
    "name": "迷失木灵",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "plant",
    "raceText": "植物系",
    "level": 8,
    "hp": 80,
    "mp": 0,
    "attack": 18,
    "defense": 8,
    "magic_attack": 18,
    "magic_defense": 8,
    "speed": 9,
    "exp": 35,
    "gold": 40,
    "drops": [
      {
        "name": "灵木之实",
        "rate": "35%"
      },
      {
        "name": "解毒草",
        "rate": "35%"
      }
    ],
    "skills": [
      "吸收"
    ],
    "weakness": "fire",
    "location": "迷雾森林 & 灵木神庙"
  },
  {
    "id": "iron_crab",
    "name": "狂暴寄居蟹",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 13,
    "hp": 180,
    "mp": 0,
    "attack": 28,
    "defense": 25,
    "magic_attack": 28,
    "magic_defense": 25,
    "speed": 5,
    "exp": 80,
    "gold": 60,
    "drops": [
      {
        "name": "碎壳",
        "rate": "35%"
      }
    ],
    "skills": [
      "缩壳"
    ],
    "weakness": "thunder",
    "location": "未知区域"
  },
  {
    "id": "jellyfish",
    "name": "深海放电水母",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 14,
    "hp": 120,
    "mp": 0,
    "attack": 25,
    "defense": 8,
    "magic_attack": 25,
    "magic_defense": 8,
    "speed": 11,
    "exp": 85,
    "gold": 70,
    "drops": [
      {
        "name": "麻痹触须",
        "rate": "35%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "未知区域"
  },
  {
    "id": "ghost_sailor",
    "name": "溺亡海盗幽灵",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 16,
    "hp": 140,
    "mp": 0,
    "attack": 32,
    "defense": 12,
    "magic_attack": 32,
    "magic_defense": 12,
    "speed": 10,
    "exp": 90,
    "gold": 90,
    "drops": [
      {
        "name": "怨念残片",
        "rate": "35%"
      },
      {
        "name": "圣水",
        "rate": "35%"
      }
    ],
    "skills": [
      "幽影斩"
    ],
    "weakness": "holy、fire",
    "location": "未知区域"
  },
  {
    "id": "sand_basilisk",
    "name": "流沙巨蜥",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 19,
    "hp": 280,
    "mp": 0,
    "attack": 45,
    "defense": 20,
    "magic_attack": 45,
    "magic_defense": 20,
    "speed": 12,
    "exp": 120,
    "gold": 120,
    "drops": [
      {
        "name": "蜥蜴尾",
        "rate": "35%"
      },
      {
        "name": "金针",
        "rate": "35%"
      }
    ],
    "skills": [
      "石化凝视"
    ],
    "weakness": "ice",
    "location": "未知区域"
  },
  {
    "id": "black_skeleton",
    "name": "徘徊黑铁骷髅",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 22,
    "hp": 240,
    "mp": 0,
    "attack": 50,
    "defense": 22,
    "magic_attack": 50,
    "magic_defense": 22,
    "speed": 15,
    "exp": 140,
    "gold": 150,
    "drops": [
      {
        "name": "秘银碎屑",
        "rate": "12%"
      }
    ],
    "skills": [
      "双持骨刃"
    ],
    "weakness": "holy、fire",
    "location": "未知区域"
  },
  {
    "id": "scorpion_stalker",
    "name": "沙漠刺客蝎",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 21,
    "hp": 210,
    "mp": 0,
    "attack": 48,
    "defense": 18,
    "magic_attack": 48,
    "magic_defense": 18,
    "speed": 18,
    "exp": 130,
    "gold": 140,
    "drops": [
      {
        "name": "剧毒囊",
        "rate": "35%"
      },
      {
        "name": "解毒草",
        "rate": "35%"
      }
    ],
    "skills": [
      "刺击"
    ],
    "weakness": "water、ice",
    "location": "未知区域"
  },
  {
    "id": "imperial_magitek",
    "name": "魔导战车",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "machine",
    "raceText": "机械系",
    "level": 35,
    "hp": 650,
    "mp": 0,
    "attack": 85,
    "defense": 40,
    "magic_attack": 85,
    "magic_defense": 40,
    "speed": 10,
    "exp": 300,
    "gold": 300,
    "drops": [
      {
        "name": "强化钢板",
        "rate": "12%"
      }
    ],
    "skills": [
      "扩散激光"
    ],
    "weakness": "thunder",
    "location": "未知区域"
  },
  {
    "id": "void_fiend",
    "name": "虚无裂口魔",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "fiend",
    "raceText": "恶魔系",
    "level": 40,
    "hp": 800,
    "mp": 0,
    "attack": 95,
    "defense": 42,
    "magic_attack": 95,
    "magic_defense": 42,
    "speed": 20,
    "exp": 380,
    "gold": 500,
    "drops": [
      {
        "name": "黑暗物质碎屑",
        "rate": "12%"
      }
    ],
    "skills": [
      "死亡咒印",
      "中冰雪",
      "中火焰"
    ],
    "weakness": "holy",
    "location": "未知区域"
  },
  {
    "id": "ancient_golem",
    "name": "守护巨像",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "machine",
    "raceText": "机械系",
    "level": 45,
    "hp": 1200,
    "mp": 0,
    "attack": 110,
    "defense": 55,
    "magic_attack": 110,
    "magic_defense": 55,
    "speed": 6,
    "exp": 450,
    "gold": 800,
    "drops": [
      {
        "name": "远古晶石",
        "rate": "12%"
      }
    ],
    "skills": [
      "重压"
    ],
    "weakness": "wind、thunder",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_001",
    "name": "哥布林",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "humanoid",
    "raceText": "人形系",
    "level": 1,
    "hp": 8,
    "mp": 0,
    "attack": 4,
    "defense": 4,
    "magic_attack": 1,
    "magic_defense": 16,
    "speed": 3,
    "exp": 6,
    "gold": 6,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_002",
    "name": "哥布林守卫",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "humanoid",
    "raceText": "人形系",
    "level": 1,
    "hp": 16,
    "mp": 0,
    "attack": 8,
    "defense": 6,
    "magic_attack": 3,
    "magic_defense": 23,
    "speed": 5,
    "exp": 18,
    "gold": 18,
    "drops": [
      {
        "name": "恢复药",
        "rate": "35%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_003",
    "name": "恶狼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 2,
    "hp": 20,
    "mp": 0,
    "attack": 8,
    "defense": 4,
    "magic_attack": 1,
    "magic_defense": 28,
    "speed": 18,
    "exp": 24,
    "gold": 6,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_004",
    "name": "疯马",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 3,
    "hp": 64,
    "mp": 0,
    "attack": 10,
    "defense": 2,
    "magic_attack": 4,
    "magic_defense": 40,
    "speed": 11,
    "exp": 63,
    "gold": 15,
    "drops": [
      {
        "name": "恢复药",
        "rate": "35%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_006",
    "name": "黑寡妇",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "insect",
    "raceText": "昆虫系",
    "level": 2,
    "hp": 28,
    "mp": 0,
    "attack": 10,
    "defense": 4,
    "magic_attack": 10,
    "magic_defense": 28,
    "speed": 15,
    "exp": 30,
    "gold": 8,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_008",
    "name": "魔狼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 3,
    "hp": 72,
    "mp": 0,
    "attack": 14,
    "defense": 4,
    "magic_attack": 3,
    "magic_defense": 46,
    "speed": 27,
    "exp": 93,
    "gold": 22,
    "drops": [
      {
        "name": "解毒药",
        "rate": "35%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_005",
    "name": "骨骼战士",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 2,
    "hp": 10,
    "mp": 0,
    "attack": 10,
    "defense": 4,
    "magic_attack": 10,
    "magic_defense": 17,
    "speed": 6,
    "exp": 9,
    "gold": 3,
    "drops": [
      {
        "name": "山彦草",
        "rate": "35%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_007",
    "name": "巨型蠕虫",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "insect",
    "raceText": "昆虫系",
    "level": 3,
    "hp": 56,
    "mp": 0,
    "attack": 17,
    "defense": 8,
    "magic_attack": 9,
    "magic_defense": 40,
    "speed": 12,
    "exp": 63,
    "gold": 15,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_009",
    "name": "人狼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 3,
    "hp": 68,
    "mp": 0,
    "attack": 14,
    "defense": 6,
    "magic_attack": 8,
    "magic_defense": 45,
    "speed": 21,
    "exp": 135,
    "gold": 67,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_010",
    "name": "僵尸",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 2,
    "hp": 20,
    "mp": 0,
    "attack": 10,
    "defense": 4,
    "magic_attack": 10,
    "magic_defense": 25,
    "speed": 3,
    "exp": 24,
    "gold": 12,
    "drops": [
      {
        "name": "法杖",
        "rate": "35%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_011",
    "name": "尸鬼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 3,
    "hp": 48,
    "mp": 0,
    "attack": 8,
    "defense": 6,
    "magic_attack": 1,
    "magic_defense": 36,
    "speed": 6,
    "exp": 93,
    "gold": 50,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_013",
    "name": "眼镜蛇",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 3,
    "hp": 56,
    "mp": 0,
    "attack": 6,
    "defense": 6,
    "magic_attack": 6,
    "magic_defense": 46,
    "speed": 15,
    "exp": 123,
    "gold": 50,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_014",
    "name": "食人魔",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "giant",
    "raceText": "giant",
    "level": 5,
    "hp": 100,
    "mp": 0,
    "attack": 18,
    "defense": 10,
    "magic_attack": 4,
    "magic_defense": 65,
    "speed": 9,
    "exp": 195,
    "gold": 195,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_015",
    "name": "食人魔盗贼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "giant",
    "raceText": "giant",
    "level": 6,
    "hp": 132,
    "mp": 0,
    "attack": 23,
    "defense": 14,
    "magic_attack": 6,
    "magic_defense": 71,
    "speed": 15,
    "exp": 282,
    "gold": 300,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_016",
    "name": "野生蜥蜴",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 92,
    "mp": 0,
    "attack": 18,
    "defense": 12,
    "magic_attack": 3,
    "magic_defense": 55,
    "speed": 12,
    "exp": 153,
    "gold": 50,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_018",
    "name": "鱼人",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 3,
    "hp": 28,
    "mp": 0,
    "attack": 10,
    "defense": 4,
    "magic_attack": 4,
    "magic_defense": 28,
    "speed": 36,
    "exp": 30,
    "gold": 30,
    "drops": [
      {
        "name": "恢复药",
        "rate": "35%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_019",
    "name": "鱼人盗贼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 64,
    "mp": 0,
    "attack": 15,
    "defense": 8,
    "magic_attack": 7,
    "magic_defense": 46,
    "speed": 39,
    "exp": 105,
    "gold": 105,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_020",
    "name": "海盗",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "humanoid",
    "raceText": "人形系",
    "level": 4,
    "hp": 50,
    "mp": 0,
    "attack": 14,
    "defense": 6,
    "magic_attack": 6,
    "magic_defense": 37,
    "speed": 12,
    "exp": 60,
    "gold": 120,
    "drops": [
      {
        "name": "佩剑",
        "rate": "35%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_021",
    "name": "鲨鱼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 120,
    "mp": 0,
    "attack": 22,
    "defense": 4,
    "magic_attack": 8,
    "magic_defense": 70,
    "speed": 36,
    "exp": 267,
    "gold": 66,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_022",
    "name": "巨瞳",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 2,
    "hp": 10,
    "mp": 0,
    "attack": 4,
    "defense": 4,
    "magic_attack": 6,
    "magic_defense": 14,
    "speed": 42,
    "exp": 42,
    "gold": 10,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_023",
    "name": "狼蛛",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "insect",
    "raceText": "昆虫系",
    "level": 4,
    "hp": 64,
    "mp": 0,
    "attack": 5,
    "defense": 12,
    "magic_attack": 3,
    "magic_defense": 46,
    "speed": 12,
    "exp": 141,
    "gold": 50,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_024",
    "name": "妖鬼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 4,
    "hp": 56,
    "mp": 0,
    "attack": 8,
    "defense": 10,
    "magic_attack": 2,
    "magic_defense": 40,
    "speed": 23,
    "exp": 117,
    "gold": 117,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_025",
    "name": "毒蝎",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "insect",
    "raceText": "昆虫系",
    "level": 5,
    "hp": 84,
    "mp": 0,
    "attack": 22,
    "defense": 10,
    "magic_attack": 6,
    "magic_defense": 55,
    "speed": 27,
    "exp": 225,
    "gold": 70,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_026",
    "name": "暗影",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 4,
    "hp": 50,
    "mp": 0,
    "attack": 10,
    "defense": 4,
    "magic_attack": 12,
    "magic_defense": 37,
    "speed": 18,
    "exp": 90,
    "gold": 45,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_027",
    "name": "绿色粘液怪",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "slime",
    "raceText": "slime",
    "level": 5,
    "hp": 24,
    "mp": 0,
    "attack": 1,
    "defense": 255,
    "magic_attack": 3,
    "magic_defense": 36,
    "speed": 8,
    "exp": 84,
    "gold": 20,
    "drops": [
      {
        "name": "高级恢复药",
        "rate": "35%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、ice",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_028",
    "name": "巨型爬虫",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "insect",
    "raceText": "昆虫系",
    "level": 5,
    "hp": 84,
    "mp": 0,
    "attack": 1,
    "defense": 8,
    "magic_attack": 5,
    "magic_defense": 51,
    "speed": 21,
    "exp": 186,
    "gold": 200,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_029",
    "name": "灰色泥浆怪",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "slime",
    "raceText": "slime",
    "level": 5,
    "hp": 76,
    "mp": 0,
    "attack": 30,
    "defense": 7,
    "magic_attack": 30,
    "magic_defense": 55,
    "speed": 2,
    "exp": 255,
    "gold": 70,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_030",
    "name": "石像鬼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "demon",
    "raceText": "demon",
    "level": 5,
    "hp": 80,
    "mp": 0,
    "attack": 12,
    "defense": 8,
    "magic_attack": 11,
    "magic_defense": 53,
    "speed": 23,
    "exp": 132,
    "gold": 80,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_031",
    "name": "血髅战士",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 144,
    "mp": 0,
    "attack": 26,
    "defense": 12,
    "magic_attack": 6,
    "magic_defense": 76,
    "speed": 21,
    "exp": 378,
    "gold": 378,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_032",
    "name": "夺灵魔",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 84,
    "mp": 0,
    "attack": 30,
    "defense": 16,
    "magic_attack": 18,
    "magic_defense": 98,
    "speed": 33,
    "exp": 276,
    "gold": 300,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_036",
    "name": "巨蟒",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 80,
    "mp": 0,
    "attack": 22,
    "defense": 10,
    "magic_attack": 11,
    "magic_defense": 56,
    "speed": 18,
    "exp": 165,
    "gold": 50,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_034",
    "name": "木乃伊",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 80,
    "mp": 0,
    "attack": 30,
    "defense": 20,
    "magic_attack": 16,
    "magic_defense": 60,
    "speed": 12,
    "exp": 300,
    "gold": 300,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_035",
    "name": "死灵",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 86,
    "mp": 0,
    "attack": 22,
    "defense": 4,
    "magic_attack": 18,
    "magic_defense": 52,
    "speed": 45,
    "exp": 231,
    "gold": 231,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "未知区域"
  },
  {
    "id": "ff1_pr_037",
    "name": "鬣齿狗",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 5,
    "hp": 120,
    "mp": 0,
    "attack": 22,
    "defense": 4,
    "magic_attack": 8,
    "magic_defense": 76,
    "speed": 24,
    "exp": 288,
    "gold": 72,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_038",
    "name": "猛虎",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 5,
    "hp": 132,
    "mp": 0,
    "attack": 22,
    "defense": 8,
    "magic_attack": 13,
    "magic_defense": 85,
    "speed": 24,
    "exp": 438,
    "gold": 108,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_039",
    "name": "弥诺陶洛斯",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 164,
    "mp": 0,
    "attack": 22,
    "defense": 4,
    "magic_attack": 8,
    "magic_defense": 95,
    "speed": 24,
    "exp": 489,
    "gold": 489,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_040",
    "name": "山岭巨人",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "giant",
    "raceText": "giant",
    "level": 5,
    "hp": 240,
    "mp": 0,
    "attack": 38,
    "defense": 12,
    "magic_attack": 5,
    "magic_defense": 120,
    "speed": 24,
    "exp": 879,
    "gold": 879,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_041",
    "name": "土元素",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 288,
    "mp": 0,
    "attack": 66,
    "defense": 20,
    "magic_attack": 18,
    "magic_defense": 130,
    "speed": 9,
    "exp": 1536,
    "gold": 768,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_042",
    "name": "巨魔",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 184,
    "mp": 0,
    "attack": 24,
    "defense": 12,
    "magic_attack": 6,
    "magic_defense": 100,
    "speed": 24,
    "exp": 621,
    "gold": 621,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_043",
    "name": "尸妖",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 52,
    "mp": 0,
    "attack": 20,
    "defense": 12,
    "magic_attack": 3,
    "magic_defense": 45,
    "speed": 21,
    "exp": 150,
    "gold": 150,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_044",
    "name": "黄色胶质怪",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "slime",
    "raceText": "slime",
    "level": 5,
    "hp": 76,
    "mp": 0,
    "attack": 32,
    "defense": 6,
    "magic_attack": 3,
    "magic_defense": 55,
    "speed": 3,
    "exp": 252,
    "gold": 70,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_045",
    "name": "蛇鸡兽",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 50,
    "mp": 0,
    "attack": 1,
    "defense": 4,
    "magic_attack": 8,
    "magic_defense": 47,
    "speed": 36,
    "exp": 186,
    "gold": 200,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_047",
    "name": "食人魔法师",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "giant",
    "raceText": "giant",
    "level": 5,
    "hp": 144,
    "mp": 0,
    "attack": 23,
    "defense": 10,
    "magic_attack": 12,
    "magic_defense": 80,
    "speed": 27,
    "exp": 723,
    "gold": 723,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_048",
    "name": "斯芬克斯",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 5,
    "hp": 228,
    "mp": 0,
    "attack": 23,
    "defense": 12,
    "magic_attack": 32,
    "magic_defense": 115,
    "speed": 60,
    "exp": 1160,
    "gold": 1160,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_050",
    "name": "掘地蜈蚣",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 222,
    "mp": 0,
    "attack": 39,
    "defense": 20,
    "magic_attack": 10,
    "magic_defense": 116,
    "speed": 24,
    "exp": 1194,
    "gold": 300,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_063",
    "name": "地狱犬",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 5,
    "hp": 192,
    "mp": 0,
    "attack": 30,
    "defense": 8,
    "magic_attack": 13,
    "magic_defense": 103,
    "speed": 24,
    "exp": 1182,
    "gold": 600,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_064",
    "name": "火焰蜥蜴",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 296,
    "mp": 0,
    "attack": 31,
    "defense": 18,
    "magic_attack": 8,
    "magic_defense": 143,
    "speed": 18,
    "exp": 2472,
    "gold": 1200,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_061",
    "name": "九头火蛇",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 182,
    "mp": 0,
    "attack": 20,
    "defense": 14,
    "magic_attack": 16,
    "magic_defense": 103,
    "speed": 18,
    "exp": 1215,
    "gold": 400,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_062",
    "name": "熔岩巨虫",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 280,
    "mp": 0,
    "attack": 50,
    "defense": 31,
    "magic_attack": 12,
    "magic_defense": 143,
    "speed": 2,
    "exp": 1671,
    "gold": 400,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_065",
    "name": "烈焰巨人",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "giant",
    "raceText": "giant",
    "level": 5,
    "hp": 300,
    "mp": 0,
    "attack": 73,
    "defense": 20,
    "magic_attack": 12,
    "magic_defense": 135,
    "speed": 24,
    "exp": 1506,
    "gold": 1506,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_066",
    "name": "红龙",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 248,
    "mp": 0,
    "attack": 75,
    "defense": 30,
    "magic_attack": 20,
    "magic_defense": 200,
    "speed": 48,
    "exp": 2904,
    "gold": 4000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_068",
    "name": "白龙",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 200,
    "mp": 0,
    "attack": 53,
    "defense": 8,
    "magic_attack": 25,
    "magic_defense": 196,
    "speed": 60,
    "exp": 1701,
    "gold": 2000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、thunder",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_069",
    "name": "冰狼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 5,
    "hp": 92,
    "mp": 0,
    "attack": 25,
    "defense": 4,
    "magic_attack": 12,
    "magic_defense": 55,
    "speed": 27,
    "exp": 402,
    "gold": 200,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_070",
    "name": "夺心魔",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 112,
    "mp": 0,
    "attack": 1,
    "defense": 12,
    "magic_attack": 26,
    "magic_defense": 187,
    "speed": 24,
    "exp": 822,
    "gold": 999,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_071",
    "name": "寒冰巨人",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "giant",
    "raceText": "giant",
    "level": 5,
    "hp": 336,
    "mp": 0,
    "attack": 60,
    "defense": 16,
    "magic_attack": 10,
    "magic_defense": 150,
    "speed": 24,
    "exp": 1752,
    "gold": 1752,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_072",
    "name": "幽鬼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 114,
    "mp": 0,
    "attack": 40,
    "defense": 12,
    "magic_attack": 25,
    "magic_defense": 67,
    "speed": 54,
    "exp": 432,
    "gold": 432,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_073",
    "name": "多脚蜈蚣",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 320,
    "mp": 0,
    "attack": 73,
    "defense": 24,
    "magic_attack": 15,
    "magic_defense": 185,
    "speed": 24,
    "exp": 2244,
    "gold": 1000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_074",
    "name": "黑暗巫师",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 105,
    "mp": 0,
    "attack": 26,
    "defense": 40,
    "magic_attack": 24,
    "magic_defense": 170,
    "speed": 39,
    "exp": 1095,
    "gold": 1095,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_076",
    "name": "沙漠巴雷塔",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 352,
    "mp": 0,
    "attack": 98,
    "defense": 48,
    "magic_attack": 12,
    "magic_defense": 156,
    "speed": 24,
    "exp": 2610,
    "gold": 1,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_077",
    "name": "剑齿虎",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 5,
    "hp": 200,
    "mp": 0,
    "attack": 24,
    "defense": 8,
    "magic_attack": 18,
    "magic_defense": 106,
    "speed": 21,
    "exp": 843,
    "gold": 500,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_078",
    "name": "双足飞龙",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 212,
    "mp": 0,
    "attack": 30,
    "defense": 12,
    "magic_attack": 16,
    "magic_defense": 115,
    "speed": 48,
    "exp": 1173,
    "gold": 50,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_079",
    "name": "双足巨龙",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 260,
    "mp": 0,
    "attack": 40,
    "defense": 22,
    "magic_attack": 24,
    "magic_defense": 131,
    "speed": 30,
    "exp": 1218,
    "gold": 502,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_080",
    "name": "曼提克",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 5,
    "hp": 164,
    "mp": 0,
    "attack": 22,
    "defense": 8,
    "magic_attack": 8,
    "magic_defense": 95,
    "speed": 36,
    "exp": 1317,
    "gold": 650,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_081",
    "name": "巴雷塔",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 256,
    "mp": 0,
    "attack": 60,
    "defense": 38,
    "magic_attack": 16,
    "magic_defense": 130,
    "speed": 28,
    "exp": 1428,
    "gold": 300,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_082",
    "name": "石化蜥蜴",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 196,
    "mp": 0,
    "attack": 30,
    "defense": 20,
    "magic_attack": 12,
    "magic_defense": 91,
    "speed": 12,
    "exp": 1977,
    "gold": 658,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_083",
    "name": "跃龙",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 480,
    "mp": 0,
    "attack": 65,
    "defense": 10,
    "magic_attack": 10,
    "magic_defense": 200,
    "speed": 30,
    "exp": 3387,
    "gold": 502,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_084",
    "name": "人虎",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 5,
    "hp": 160,
    "mp": 0,
    "attack": 30,
    "defense": 16,
    "magic_attack": 8,
    "magic_defense": 93,
    "speed": 24,
    "exp": 780,
    "gold": 780,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_085",
    "name": "沙地巨虫",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 200,
    "mp": 0,
    "attack": 46,
    "defense": 14,
    "magic_attack": 18,
    "magic_defense": 103,
    "speed": 31,
    "exp": 2683,
    "gold": 900,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_086",
    "name": "僵尸弥诺陶洛斯",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 224,
    "mp": 0,
    "attack": 40,
    "defense": 14,
    "magic_attack": 1,
    "magic_defense": 116,
    "speed": 18,
    "exp": 1050,
    "gold": 1050,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_087",
    "name": "木乃伊王",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 188,
    "mp": 0,
    "attack": 43,
    "defense": 24,
    "magic_attack": 24,
    "magic_defense": 95,
    "speed": 12,
    "exp": 984,
    "gold": 1000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_088",
    "name": "美杜莎",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 68,
    "mp": 0,
    "attack": 20,
    "defense": 10,
    "magic_attack": 16,
    "magic_defense": 55,
    "speed": 18,
    "exp": 699,
    "gold": 699,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_089",
    "name": "罗刹",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "beast",
    "raceText": "野兽系",
    "level": 5,
    "hp": 110,
    "mp": 0,
    "attack": 20,
    "defense": 30,
    "magic_attack": 15,
    "magic_defense": 62,
    "speed": 30,
    "exp": 603,
    "gold": 800,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_090",
    "name": "泥土巨像",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 176,
    "mp": 0,
    "attack": 64,
    "defense": 7,
    "magic_attack": 16,
    "magic_defense": 93,
    "speed": 14,
    "exp": 1257,
    "gold": 800,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_091",
    "name": "梦魇",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 200,
    "mp": 0,
    "attack": 30,
    "defense": 24,
    "magic_attack": 20,
    "magic_defense": 100,
    "speed": 66,
    "exp": 1272,
    "gold": 700,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_092",
    "name": "僵尸龙",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 268,
    "mp": 0,
    "attack": 56,
    "defense": 30,
    "magic_attack": 26,
    "magic_defense": 135,
    "speed": 12,
    "exp": 2331,
    "gold": 999,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_093",
    "name": "鱼人王子",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 204,
    "mp": 0,
    "attack": 47,
    "defense": 20,
    "magic_attack": 15,
    "magic_defense": 101,
    "speed": 48,
    "exp": 882,
    "gold": 882,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_094",
    "name": "白鲨",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 344,
    "mp": 0,
    "attack": 50,
    "defense": 8,
    "magic_attack": 16,
    "magic_defense": 170,
    "speed": 36,
    "exp": 2361,
    "gold": 600,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_095",
    "name": "深瞳",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 304,
    "mp": 0,
    "attack": 30,
    "defense": 16,
    "magic_attack": 30,
    "magic_defense": 156,
    "speed": 12,
    "exp": 3591,
    "gold": 3591,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_096",
    "name": "海蛇",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 224,
    "mp": 0,
    "attack": 35,
    "defense": 12,
    "magic_attack": 21,
    "magic_defense": 116,
    "speed": 24,
    "exp": 957,
    "gold": 600,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_097",
    "name": "海蝎",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 148,
    "mp": 0,
    "attack": 35,
    "defense": 18,
    "magic_attack": 11,
    "magic_defense": 85,
    "speed": 30,
    "exp": 639,
    "gold": 300,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_098",
    "name": "海魔",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 216,
    "mp": 0,
    "attack": 40,
    "defense": 20,
    "magic_attack": 10,
    "magic_defense": 110,
    "speed": 24,
    "exp": 852,
    "gold": 852,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_099",
    "name": "游魂",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 180,
    "mp": 0,
    "attack": 93,
    "defense": 30,
    "magic_attack": 30,
    "magic_defense": 85,
    "speed": 18,
    "exp": 990,
    "gold": 990,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_100",
    "name": "水元素",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 300,
    "mp": 0,
    "attack": 69,
    "defense": 20,
    "magic_attack": 32,
    "magic_defense": 130,
    "speed": 36,
    "exp": 1962,
    "gold": 800,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_101",
    "name": "水之那迦",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 356,
    "mp": 0,
    "attack": 9,
    "defense": 8,
    "magic_attack": 25,
    "magic_defense": 116,
    "speed": 36,
    "exp": 2355,
    "gold": 2355,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_103",
    "name": "霸王龙",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 600,
    "mp": 0,
    "attack": 115,
    "defense": 10,
    "magic_attack": 24,
    "magic_defense": 200,
    "speed": 30,
    "exp": 7200,
    "gold": 600,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_104",
    "name": "黑骑士",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 260,
    "mp": 0,
    "attack": 44,
    "defense": 38,
    "magic_attack": 20,
    "magic_defense": 135,
    "speed": 18,
    "exp": 1263,
    "gold": 1800,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_105",
    "name": "奇美拉",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 300,
    "mp": 0,
    "attack": 30,
    "defense": 20,
    "magic_attack": 24,
    "magic_defense": 130,
    "speed": 36,
    "exp": 2064,
    "gold": 2500,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_106",
    "name": "守卫机器人",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 200,
    "mp": 0,
    "attack": 25,
    "defense": 40,
    "magic_attack": 24,
    "magic_defense": 110,
    "speed": 36,
    "exp": 1224,
    "gold": 400,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_107",
    "name": "蓝龙",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 454,
    "mp": 0,
    "attack": 92,
    "defense": 20,
    "magic_attack": 28,
    "magic_defense": 200,
    "speed": 48,
    "exp": 3274,
    "gold": 2000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_108",
    "name": "绿龙",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 352,
    "mp": 0,
    "attack": 72,
    "defense": 16,
    "magic_attack": 24,
    "magic_defense": 200,
    "speed": 48,
    "exp": 4068,
    "gold": 5000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_109",
    "name": "岩石巨像",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 200,
    "mp": 0,
    "attack": 70,
    "defense": 16,
    "magic_attack": 21,
    "magic_defense": 110,
    "speed": 12,
    "exp": 2385,
    "gold": 1000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_110",
    "name": "风元素",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 358,
    "mp": 0,
    "attack": 53,
    "defense": 4,
    "magic_attack": 40,
    "magic_defense": 130,
    "speed": 72,
    "exp": 1614,
    "gold": 807,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_111",
    "name": "灵之那迦",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 420,
    "mp": 0,
    "attack": 7,
    "defense": 16,
    "magic_attack": 32,
    "magic_defense": 143,
    "speed": 24,
    "exp": 3489,
    "gold": 4000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_112",
    "name": "死亡骑士",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 190,
    "mp": 0,
    "attack": 55,
    "defense": 32,
    "magic_attack": 28,
    "magic_defense": 173,
    "speed": 21,
    "exp": 2700,
    "gold": 3000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_113",
    "name": "穴居美杜莎",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 96,
    "mp": 0,
    "attack": 11,
    "defense": 12,
    "magic_attack": 24,
    "magic_defense": 70,
    "speed": 36,
    "exp": 1218,
    "gold": 1218,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_114",
    "name": "黑色软糊怪",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 156,
    "mp": 0,
    "attack": 49,
    "defense": 255,
    "magic_attack": 6,
    "magic_defense": 85,
    "speed": 12,
    "exp": 1101,
    "gold": 900,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_115",
    "name": "战斗机器人",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 400,
    "mp": 0,
    "attack": 102,
    "defense": 48,
    "magic_attack": 28,
    "magic_defense": 160,
    "speed": 48,
    "exp": 4000,
    "gold": 2000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "thunder",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_116",
    "name": "吸血鬼领主",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 300,
    "mp": 0,
    "attack": 90,
    "defense": 28,
    "magic_attack": 34,
    "magic_defense": 84,
    "speed": 36,
    "exp": 2385,
    "gold": 3000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_117",
    "name": "黑暗战士",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 200,
    "mp": 0,
    "attack": 40,
    "defense": 38,
    "magic_attack": 34,
    "magic_defense": 186,
    "speed": 45,
    "exp": 3420,
    "gold": 3420,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_120",
    "name": "强化奇美拉",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 350,
    "mp": 0,
    "attack": 40,
    "defense": 18,
    "magic_attack": 30,
    "magic_defense": 143,
    "speed": 30,
    "exp": 4584,
    "gold": 5000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_121",
    "name": "死神之眼",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 360,
    "mp": 0,
    "attack": 120,
    "defense": 60,
    "magic_attack": 35,
    "magic_defense": 160,
    "speed": 12,
    "exp": 1,
    "gold": 1,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "fire、holy",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_122",
    "name": "紫色巨虫",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 448,
    "mp": 0,
    "attack": 65,
    "defense": 10,
    "magic_attack": 24,
    "magic_defense": 200,
    "speed": 18,
    "exp": 4344,
    "gold": 1000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_123",
    "name": "钢铁巨像",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 304,
    "mp": 0,
    "attack": 93,
    "defense": 100,
    "magic_attack": 26,
    "magic_defense": 143,
    "speed": 12,
    "exp": 6717,
    "gold": 3000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_118",
    "name": "死亡机器",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 2000,
    "mp": 0,
    "attack": 128,
    "defense": 80,
    "magic_attack": 50,
    "magic_defense": 200,
    "speed": 48,
    "exp": 32000,
    "gold": 32000,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_058",
    "name": "长角魔",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 94,
    "mp": 0,
    "attack": 10,
    "defense": 32,
    "magic_attack": 17,
    "magic_defense": 127,
    "speed": 36,
    "exp": 387,
    "gold": 387,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "常规物攻",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_060",
    "name": "火元素",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 276,
    "mp": 0,
    "attack": 50,
    "defense": 20,
    "magic_attack": 20,
    "magic_defense": 130,
    "speed": 21,
    "exp": 1620,
    "gold": 800,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_059",
    "name": "魔鸡兽",
    "category": "monster",
    "rank": "normal",
    "rankText": "普通原野怪",
    "race": "unknown",
    "raceText": "unknown",
    "level": 5,
    "hp": 44,
    "mp": 0,
    "attack": 20,
    "defense": 4,
    "magic_attack": 15,
    "magic_defense": 45,
    "speed": 36,
    "exp": 423,
    "gold": 500,
    "drops": [
      {
        "name": "基础金币",
        "rate": "100%"
      }
    ],
    "skills": [
      "普通攻击"
    ],
    "weakness": "ice",
    "location": "晨辉原野 & 宁静村周边"
  },
  {
    "id": "ff1_pr_033",
    "name": "阿斯托斯",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "boss",
    "raceText": "首领领主",
    "level": 5,
    "hp": 420,
    "mp": 100,
    "attack": 30,
    "defense": 18,
    "magic_attack": 24,
    "magic_defense": 170,
    "speed": 39,
    "exp": 2250,
    "gold": 2000,
    "drops": [
      {
        "name": "秘银剑",
        "rate": "35%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "西城"
  },
  {
    "id": "ff1_pr_053",
    "name": "巨鳄",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 184,
    "mp": 100,
    "attack": 42,
    "defense": 16,
    "magic_attack": 9,
    "magic_defense": 103,
    "speed": 24,
    "exp": 816,
    "gold": 900,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "雷",
    "location": "世界地图"
  },
  {
    "id": "ff1_pr_075",
    "name": "恶魔之眼",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "魔法生物",
    "raceText": "魔法生物",
    "level": 5,
    "hp": 162,
    "mp": 100,
    "attack": 30,
    "defense": 30,
    "magic_attack": 20,
    "magic_defense": 92,
    "speed": 6,
    "exp": 3225,
    "gold": 3225,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "浮游城\n冰之洞窟"
  },
  {
    "id": "ff1_pr_012",
    "name": "加兰德",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "boss",
    "raceText": "首领领主",
    "level": 3,
    "hp": 212,
    "mp": 100,
    "attack": 15,
    "defense": 8,
    "magic_attack": 12,
    "magic_defense": 64,
    "speed": 6,
    "exp": 130,
    "gold": 250,
    "drops": [
      {
        "name": "长剑",
        "rate": "35%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "混沌神殿"
  },
  {
    "id": "ff1_pr_057",
    "name": "九头巨蛇",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 212,
    "mp": 100,
    "attack": 30,
    "defense": 14,
    "magic_attack": 14,
    "magic_defense": 116,
    "speed": 18,
    "exp": 915,
    "gold": 150,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "世界地图"
  },
  {
    "id": "ff1_pr_102",
    "name": "克拉肯",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 1800,
    "mp": 100,
    "attack": 50,
    "defense": 60,
    "magic_attack": 32,
    "magic_defense": 160,
    "speed": 42,
    "exp": 4245,
    "gold": 5000,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "雷",
    "location": "海底神殿"
  },
  {
    "id": "ff1_pr_126",
    "name": "克拉肯",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 3600,
    "mp": 100,
    "attack": 60,
    "defense": 80,
    "magic_attack": 41,
    "magic_defense": 200,
    "speed": 49,
    "exp": 2000,
    "gold": 1,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "混沌神殿"
  },
  {
    "id": "ff1_pr_049",
    "name": "巫妖",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 1200,
    "mp": 100,
    "attack": 40,
    "defense": 40,
    "magic_attack": 30,
    "magic_defense": 120,
    "speed": 12,
    "exp": 2200,
    "gold": 3000,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "火\n天辉系",
    "location": "地之洞窟"
  },
  {
    "id": "ff1_pr_124",
    "name": "巫妖",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 2800,
    "mp": 100,
    "attack": 50,
    "defense": 80,
    "magic_attack": 34,
    "magic_defense": 140,
    "speed": 24,
    "exp": 2000,
    "gold": 1,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "天辉系",
    "location": "混沌神殿"
  },
  {
    "id": "ff1_pr_067",
    "name": "马莉莉丝",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "魔法师\n魔法生物",
    "raceText": "魔法师\n魔法生物",
    "level": 5,
    "hp": 1440,
    "mp": 100,
    "attack": 40,
    "defense": 50,
    "magic_attack": 32,
    "magic_defense": 183,
    "speed": 24,
    "exp": 2475,
    "gold": 3000,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "格鲁格火山"
  },
  {
    "id": "ff1_pr_125",
    "name": "马莉莉丝",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "魔法师\n魔法生物",
    "raceText": "魔法师\n魔法生物",
    "level": 5,
    "hp": 3200,
    "mp": 100,
    "attack": 60,
    "defense": 80,
    "magic_attack": 41,
    "magic_defense": 183,
    "speed": 30,
    "exp": 2000,
    "gold": 1,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "混沌神殿"
  },
  {
    "id": "ff1_pr_056",
    "name": "进化大嘴花",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "boss",
    "raceText": "首领领主",
    "level": 5,
    "hp": 344,
    "mp": 100,
    "attack": 35,
    "defense": 32,
    "magic_attack": 20,
    "magic_defense": 170,
    "speed": 12,
    "exp": 3189,
    "gold": 500,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "浮游城"
  },
  {
    "id": "ff1_pr_055",
    "name": "大嘴花",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "boss",
    "raceText": "首领领主",
    "level": 5,
    "hp": 208,
    "mp": 100,
    "attack": 20,
    "defense": 24,
    "magic_attack": 18,
    "magic_defense": 116,
    "speed": 12,
    "exp": 1224,
    "gold": 102,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "雷",
    "location": "世界地图"
  },
  {
    "id": "ff1_pr_051",
    "name": "食人鱼",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 92,
    "mp": 100,
    "attack": 22,
    "defense": 20,
    "magic_attack": 10,
    "magic_defense": 68,
    "speed": 36,
    "exp": 240,
    "gold": 20,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "雷",
    "location": "世界地图"
  },
  {
    "id": "ff1_pr_017",
    "name": "海贼",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "boss",
    "raceText": "首领领主",
    "level": 2,
    "hp": 24,
    "mp": 100,
    "attack": 10,
    "defense": 20,
    "magic_attack": 3,
    "magic_defense": 35,
    "speed": 6,
    "exp": 40,
    "gold": 40,
    "drops": [
      {
        "name": "皮盾",
        "rate": "35%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "普拉博卡港口镇"
  },
  {
    "id": "ff1_pr_052",
    "name": "红食人鱼",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 172,
    "mp": 100,
    "attack": 37,
    "defense": 20,
    "magic_attack": 13,
    "magic_defense": 83,
    "speed": 36,
    "exp": 546,
    "gold": 46,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "世界地图"
  },
  {
    "id": "ff1_pr_119",
    "name": "提亚马特",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 2400,
    "mp": 100,
    "attack": 53,
    "defense": 80,
    "magic_attack": 45,
    "magic_defense": 200,
    "speed": 36,
    "exp": 5496,
    "gold": 6000,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "浮游城"
  },
  {
    "id": "ff1_pr_127",
    "name": "提亚马特",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "dragon",
    "raceText": "龙族",
    "level": 5,
    "hp": 5500,
    "mp": 100,
    "attack": 75,
    "defense": 90,
    "magic_attack": 38,
    "magic_defense": 200,
    "speed": 45,
    "exp": 2000,
    "gold": 1,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "全域高阶爆发",
    "location": "混沌神殿"
  },
  {
    "id": "ff1_pr_046",
    "name": "吸血鬼",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "undead",
    "raceText": "不死系",
    "level": 5,
    "hp": 280,
    "mp": 100,
    "attack": 76,
    "defense": 26,
    "magic_attack": 26,
    "magic_defense": 75,
    "speed": 36,
    "exp": 1200,
    "gold": 2000,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "火\n天辉系",
    "location": "幻象塔\n混沌神殿\n地之洞窟"
  },
  {
    "id": "ff1_pr_054",
    "name": "白鳄",
    "category": "monster",
    "rank": "boss",
    "rankText": "剧情守关Boss",
    "race": "aquatic",
    "raceText": "水栖系",
    "level": 5,
    "hp": 288,
    "mp": 100,
    "attack": 56,
    "defense": 20,
    "magic_attack": 16,
    "magic_defense": 143,
    "speed": 24,
    "exp": 1890,
    "gold": 2000,
    "drops": [
      {
        "name": "首领印记",
        "rate": "100%"
      }
    ],
    "skills": [
      "霸体狂暴",
      "阶段专属特技",
      "终极冲击",
      "全域天谴"
    ],
    "weakness": "雷",
    "location": "世界地图"
  },
  {
    "id": "boss_dragon_tyrant",
    "name": "暴虐远古龙",
    "category": "monster",
    "rank": "coliseum",
    "rankText": "斗技场深渊霸主",
    "race": "dragon",
    "raceText": "神魔异构体",
    "level": 45,
    "hp": 5000,
    "mp": 999,
    "attack": 150,
    "defense": 70,
    "magic_attack": 100,
    "magic_defense": 55,
    "speed": 35,
    "exp": 1500,
    "gold": 1000,
    "drops": [
      {
        "name": "斗技场优胜桂冠",
        "rate": "100%"
      },
      {
        "name": "星之核",
        "rate": "40%"
      }
    ],
    "skills": [
      "深渊雷光",
      "深渊重击"
    ],
    "weakness": "无弱点（需高阶破盾策略）",
    "location": "角斗场深渊核心"
  },
  {
    "id": "boss_shadow_shogun",
    "name": "影刹剑圣",
    "category": "monster",
    "rank": "coliseum",
    "rankText": "斗技场深渊霸主",
    "race": "humanoid",
    "raceText": "神魔异构体",
    "level": 50,
    "hp": 6500,
    "mp": 999,
    "attack": 165,
    "defense": 78,
    "magic_attack": 115,
    "magic_defense": 63,
    "speed": 40,
    "exp": 2000,
    "gold": 1400,
    "drops": [
      {
        "name": "斗技场优胜桂冠",
        "rate": "100%"
      },
      {
        "name": "星之核",
        "rate": "40%"
      }
    ],
    "skills": [
      "深渊雷光",
      "深渊重击"
    ],
    "weakness": "无弱点（需高阶破盾策略）",
    "location": "角斗场深渊核心"
  },
  {
    "id": "boss_fallen_crusader",
    "name": "堕落圣灵十字军",
    "category": "monster",
    "rank": "coliseum",
    "rankText": "斗技场深渊霸主",
    "race": "humanoid",
    "raceText": "神魔异构体",
    "level": 55,
    "hp": 8000,
    "mp": 999,
    "attack": 180,
    "defense": 86,
    "magic_attack": 130,
    "magic_defense": 71,
    "speed": 45,
    "exp": 2500,
    "gold": 1800,
    "drops": [
      {
        "name": "斗技场优胜桂冠",
        "rate": "100%"
      },
      {
        "name": "星之核",
        "rate": "40%"
      }
    ],
    "skills": [
      "深渊雷光",
      "深渊重击"
    ],
    "weakness": "无弱点（需高阶破盾策略）",
    "location": "角斗场深渊核心"
  },
  {
    "id": "boss_archmage_astral",
    "name": "星界大法师",
    "category": "monster",
    "rank": "coliseum",
    "rankText": "斗技场深渊霸主",
    "race": "humanoid",
    "raceText": "神魔异构体",
    "level": 60,
    "hp": 10000,
    "mp": 999,
    "attack": 195,
    "defense": 94,
    "magic_attack": 145,
    "magic_defense": 79,
    "speed": 50,
    "exp": 3000,
    "gold": 2200,
    "drops": [
      {
        "name": "斗技场优胜桂冠",
        "rate": "100%"
      },
      {
        "name": "星之核",
        "rate": "40%"
      }
    ],
    "skills": [
      "深渊雷光",
      "深渊重击"
    ],
    "weakness": "无弱点（需高阶破盾策略）",
    "location": "角斗场深渊核心"
  },
  {
    "id": "boss_abyssal_sovereign",
    "name": "深渊终极裁决之神",
    "category": "monster",
    "rank": "coliseum",
    "rankText": "斗技场深渊霸主",
    "race": "humanoid",
    "raceText": "神魔异构体",
    "level": 65,
    "hp": 14000,
    "mp": 999,
    "attack": 210,
    "defense": 102,
    "magic_attack": 160,
    "magic_defense": 87,
    "speed": 55,
    "exp": 3500,
    "gold": 2600,
    "drops": [
      {
        "name": "斗技场优胜桂冠",
        "rate": "100%"
      },
      {
        "name": "星之核",
        "rate": "40%"
      }
    ],
    "skills": [
      "深渊雷光",
      "深渊重击"
    ],
    "weakness": "无弱点（需高阶破盾策略）",
    "location": "角斗场深渊核心"
  },
  {
    "id": "muramasa_wraith",
    "name": "妖刀村正之灵",
    "category": "monster",
    "rank": "boss",
    "rankText": "鬼子岛妖刀守关Boss",
    "race": "undead",
    "raceText": "死灵不死系",
    "level": 35,
    "hp": 35000,
    "mp": 999,
    "attack": 220,
    "defense": 120,
    "magic_attack": 140,
    "magic_defense": 80,
    "speed": 80,
    "exp": 4500,
    "gold": 3800,
    "drops": [
      {
        "name": "妖刀残片",
        "rate": "100%"
      }
    ],
    "skills": [
      "怨刃居合 (1.5倍高频单体物理斩击)",
      "妖气爆发",
      "绝影瞬杀"
    ],
    "weakness": "圣属性、火属性（受高阶净化克制）",
    "location": "鬼子岛八岐神殿 5F (妖刀冢)"
  }
],
  characters: [
  {
    "id": "li_chuan",
    "name": "黎川",
    "category": "character",
    "party": "light",
    "partyText": "光之战士 (晨辉队伍)",
    "title": "晨辉之剑 / 原初命运之子",
    "quote": "“只要黎明尚未到来，手中的剑就绝不能放下！”",
    "role": "晨辉少年、卫珩的剑术弟子",
    "ending": "参与恢复世界；与伙伴并肩击破混沌后，回归故里守护重生的土地",
    "stats": { "str": 94, "agi": 82, "vit": 88, "mag": 65, "spr": 78, "luck": 80 },
    "signature_skill": "天翔闪光斩 (三连斩破甲物理极意)",
    "best_jobs": [
      { "id": "mystic_knight", "name": "魔法剑士" },
      { "id": "warrior", "name": "自由战士" },
      { "id": "ninja", "name": "二刀流忍者" }
    ],
    "chapters": [
      { "id": "ch00_prologue", "title": "序章：晨辉的异变" },
      { "id": "ch02_dragoon", "title": "第3–4章：光队·龙骑士之证" },
      { "id": "ch08_paladin", "title": "第19–20章：光队·骑士的复职" },
      { "id": "ch12_finale_two", "title": "第29–30章：非之世界" }
    ],
    "bio": "生于晨辉王都的孤毅少年，从小接受边境守护导师卫珩严格的剑术淬炼。始源神殿晶石暴走将世界撕裂后，他被光之意志推选为光之战士小队领袖。历经龙栖岭、人鱼湾与记忆织造城的无数惨烈战役，从一名单纯追求剑技极限的热血少年，蜕变为背负双月众生记忆与宿命的传说勇者。"
  },
  {
    "id": "wei_heng",
    "name": "卫珩",
    "category": "character",
    "party": "light",
    "partyText": "光之战士 (晨辉队伍)",
    "title": "坚壁圣骑 / 晨辉禁卫骑士长",
    "quote": "“我所立足之处，即为同伴绝不陷落之要塞。”",
    "role": "澄月之兄、晨辉剑士与导师",
    "ending": "接替戈闻统领古王遗都骑士团，重建战后王国秩序",
    "stats": { "str": 92, "agi": 60, "vit": 98, "mag": 50, "spr": 85, "luck": 70 },
    "signature_skill": "圣盾庇佑 (全队承受伤害分摊与护甲增幅)",
    "best_jobs": [
      { "id": "paladin", "name": "圣骑士" },
      { "id": "dragoon", "name": "龙骑士" },
      { "id": "warrior", "name": "重铠护卫" }
    ],
    "chapters": [
      { "id": "ch00_prologue", "title": "序章：晨辉的异变" },
      { "id": "ch08_paladin", "title": "第19–20章：光队·骑士的复职" },
      { "id": "ch11_finale_one", "title": "第26–28章：永曜的空甲" }
    ],
    "bio": "原晨辉王国首席禁卫剑士，性格严谨沉稳，对部下和妹妹澄月怀有深沉的责任感。晶石碎裂时与澄月天各一方，但他克制私情全力维系光之战士小队的生存。在经历古王遗都骑士团长戈闻的宿命转折后，正式承袭远古圣骑士之道，成为队伍中无可撼动的绝对壁垒。"
  },
  {
    "id": "qian_luo",
    "name": "茜罗",
    "category": "character",
    "party": "light",
    "partyText": "光之战士 (晨辉队伍)",
    "title": "遗都真皇 / 破晓灵能者",
    "quote": "“王冠并非特权，而是承担全境眼泪与赎罪的烙印。”",
    "role": "永曜飞空艇上的神秘囚徒，后揭为古王遗都王族幸存者",
    "ending": "加冕为古王遗都女王，终结双月战乱时代",
    "stats": { "str": 70, "agi": 85, "vit": 72, "mag": 90, "spr": 88, "luck": 86 },
    "signature_skill": "极光敕令 (神圣大范围破甲致盲魔击)",
    "best_jobs": [
      { "id": "memorist", "name": "记忆师" },
      { "id": "sage", "name": "全知贤者" },
      { "id": "red_mage", "name": "连续魔赤魔道士" }
    ],
    "chapters": [
      { "id": "ch01_reckoning", "title": "第1章：晶石碎裂" },
      { "id": "ch06_memorist", "title": "第13–15章：光队·记忆的人造者" },
      { "id": "ch08_paladin", "title": "第19–20章：光队·骑士的复职" }
    ],
    "bio": "曾作为高阶囚徒被锁于永曜飞空艇深处，言谈举止间流露着失传远古王朝的高雅与决断。随光队逃出生天后，其隐藏的古王室血脉逐渐苏醒。面对帝国空甲与人造记忆生命的悲剧，她选择直面灭国之仇，以仁德唤醒遗民并在终战后顺利登基为女王。"
  },
  {
    "id": "zhou_yin",
    "name": "昼隐",
    "category": "character",
    "party": "light",
    "partyText": "光之战士 (晨辉队伍)",
    "title": "晨曦神官 / 秘法都席座",
    "quote": "“只要还有一丝呼吸，奇迹的圣光便不会熄灭。”",
    "role": "夜织的双胞胎兄长、秘法都白魔法师",
    "ending": "从非之世界获救，接替索菲成为秘法都大长老",
    "stats": { "str": 45, "agi": 75, "vit": 65, "mag": 95, "spr": 99, "luck": 75 },
    "signature_skill": "全域超圣愈 (全员满血驱散且附加再生)",
    "best_jobs": [
      { "id": "white_mage", "name": "白魔道士" },
      { "id": "seer", "name": "神谕使者" },
      { "id": "sage", "name": "贤者" }
    ],
    "chapters": [
      { "id": "ch00_prologue", "title": "序章：晨辉的异变" },
      { "id": "ch04_bard", "title": "第7–9章：光队·诗人的悲歌" },
      { "id": "ch12_finale_two", "title": "第29–30章：非之世界" }
    ],
    "bio": "秘法都顶尖白魔法天才，性格温柔内敛，与身在暗队的双胞胎妹妹夜织拥有超越时空的灵魂共鸣。在光之队伍中扮演抚平伤痛与指引精神方向的心脏角色。在终章坠入虚空非之世界时，凭借炽烈的信念与夜织联手维系了两个世界的生命锚点。"
  },
  {
    "id": "nahart",
    "name": "纳哈特",
    "category": "character",
    "party": "dark",
    "partyText": "暗之战士 (永曜队伍)",
    "title": "断罪黑铠 / 孤狼领袖",
    "quote": "“黑暗不是罪恶的温床，而是斩断伪善的沉重利刃。”",
    "role": "烬堡战灾孤儿、谐律城囚徒",
    "ending": "参与恢复世界；击破虚空后独行探寻烬堡荒野的余火",
    "stats": { "str": 96, "agi": 78, "vit": 90, "mag": 70, "spr": 65, "luck": 72 },
    "signature_skill": "暗月断魂斩 (消耗自身生命造成毁灭性暗影破防连斩)",
    "best_jobs": [
      { "id": "dark_knight", "name": "暗黑骑士" },
      { "id": "ninja", "name": "暗影忍者" },
      { "id": "warrior", "name": "狂战士" }
    ],
    "chapters": [
      { "id": "ch01_reckoning", "title": "第1章：晶石碎裂" },
      { "id": "ch05_dark_knight", "title": "第10–12章：暗队·徘徊的黑甲" },
      { "id": "ch10_twilight", "title": "第23–25章：黄昏篇·两个世界的接合" }
    ],
    "bio": "烬堡大火与帝国暴政下的幸存孤儿，少时沦为谐律城死囚斗士。外表冷酷沉默，内心却将同伴安危置于生命之上。他重构了暗黑骑士的信条——真正的黑铠是为了承受常人不敢背负的恶名与伤痛。在红之月破碎阴影下带领暗队完成了惊天反攻。"
  },
  {
    "id": "cheng_yue",
    "name": "澄月",
    "category": "character",
    "party": "dark",
    "partyText": "暗之战士 (永曜队伍)",
    "title": "幽兰舞者 / 灵动之影",
    "quote": "“战场上的每一步回旋，都在谱写死与生的交响。”",
    "role": "卫珩之妹、晨辉长大的少女",
    "ending": "与众人重聚；卸下战刀，漫游新大陆采风传艺",
    "stats": { "str": 75, "agi": 96, "vit": 68, "mag": 82, "spr": 80, "luck": 92 },
    "signature_skill": "剑舞·满月狂澜 (400%爆发物理连击附带催眠迷乱)",
    "best_jobs": [
      { "id": "dancer", "name": "剑舞歌姬" },
      { "id": "ranger", "name": "乱打神射手" },
      { "id": "ninja", "name": "二刀流刺客" }
    ],
    "chapters": [
      { "id": "ch01_reckoning", "title": "第1章：晶石碎裂" },
      { "id": "ch03_ranger", "title": "第5–6章：暗队·失明的猎人" },
      { "id": "ch07_dancer", "title": "第16–18章：暗队·战场的舞步" }
    ],
    "bio": "卫珩最挂念的胞妹，机敏灵动且具极高武道天赋。在世界崩裂被甩入暗之世界后，并未沉沦恐惧，而是在沙月城残酷谍战中继承了失传的战斗舞步。她是暗队不可或缺的灵气调节剂与暴击输出核心。"
  },
  {
    "id": "ren_ge",
    "name": "刃歌",
    "category": "character",
    "party": "dark",
    "partyText": "暗之战士 (永曜队伍)",
    "title": "影武宗师 / 幽夜忍狩",
    "quote": "“忍者的双刀，只为守卫身后值得信任的影子。”",
    "role": "黎川与澄月的童年友人",
    "ending": "与众人重聚；被夜织拉进下一场未知的深渊探险",
    "stats": { "str": 88, "agi": 99, "vit": 74, "mag": 60, "spr": 72, "luck": 88 },
    "signature_skill": "真·乱打瞬狱杀 (4次高频无视防御致命穿刺)",
    "best_jobs": [
      { "id": "ninja", "name": "二刀流忍者" },
      { "id": "thief", "name": "盗贼义贼" },
      { "id": "mystic_knight", "name": "魔法剑士" }
    ],
    "chapters": [
      { "id": "ch01_reckoning", "title": "第1章：晶石碎裂" },
      { "id": "ch09_ninja", "title": "第21–22章：暗队·影乡的命运" },
      { "id": "ch11_finale_one", "title": "第26–28章：永曜的空甲" }
    ],
    "bio": "出身于神秘避世隐村，与黎川是挚友兼竞争对手。身手极其矫健，在影乡内乱中揭破帝国阴谋，从独臂大师刃无处顿悟了影杀精义。左右手持握草薙与鬼彻两把神兵时，具备瞬间撕裂任何终极 Boss 防御的恐怖爆发。"
  },
  {
    "id": "ye_zhi",
    "name": "夜织",
    "category": "character",
    "party": "dark",
    "partyText": "暗之战士 (永曜队伍)",
    "title": "幽冥大魔导 / 禁咒咏唱者",
    "quote": "“毁灭与重塑，不过是元素魔能的一念之间。”",
    "role": "昼隐的双胞胎妹妹、秘法都黑魔法师",
    "ending": "从非之世界获救；继续与哥哥昼隐展开学术争鸣",
    "stats": { "str": 40, "agi": 84, "vit": 60, "mag": 99, "spr": 82, "luck": 78 },
    "signature_skill": "禁断连续陨石 (双重连续施放9阶黑魔法)",
    "best_jobs": [
      { "id": "black_mage", "name": "黑魔道士" },
      { "id": "magus", "name": "大魔道士" },
      { "id": "red_mage", "name": "连续魔赤魔道士" }
    ],
    "chapters": [
      { "id": "ch01_reckoning", "title": "第1章：晶石碎裂" },
      { "id": "ch05_dark_knight", "title": "第10–12章：暗队·徘徊的黑甲" },
      { "id": "ch12_finale_two", "title": "第29–30章：非之世界" }
    ],
    "bio": "秘法都天才少女魔导士，言语犀利俏皮但极重义气。对禁忌古代魔导回路有惊人领悟力。在暗队征程中掌控最高阶黑魔法与深渊虚空法则，并在黄昏与终章战役中施放终极魔法为全队劈开混沌归途。"
  },
  {
    "id": "yan_zhao",
    "name": "言昭",
    "category": "character",
    "party": "light",
    "partyText": "特别同伴 / 永曜真身",
    "title": "混沌假面 / 永曜皇帝",
    "quote": "“两个世界的分离与痛苦，唯有彻底融于永恒的虚空，方能得到救赎。”",
    "role": "自称预言者，长期同行光队；真实身份为永曜皇帝",
    "ending": "终战显现混沌言昭姿态，被光暗联队合力终结，化为晶石微尘",
    "stats": { "str": 95, "agi": 90, "vit": 95, "mag": 99, "spr": 99, "luck": 50 },
    "signature_skill": "次元崩坏·虚无归零 (全场清空增益并造成毁灭重创)",
    "best_jobs": [
      { "id": "sage", "name": "混沌全知者" },
      { "id": "magus", "name": "时空执掌官" }
    ],
    "chapters": [
      { "id": "ch00_prologue", "title": "序章：晨辉的异变" },
      { "id": "ch05_dark_knight", "title": "第10–12章：暗队·徘徊的黑甲" },
      { "id": "ch11_finale_one", "title": "第26–28章：永曜的空甲" },
      { "id": "ch12_finale_two", "title": "第29–30章：非之世界" }
    ],
    "bio": "以白袍预言者的温和形象长年潜伏在光队之中，默默洞察双月晶石流向。他曾见证双月文明因资源争夺而走向毁灭的远古惨剧，执念于通过将一切生命拉入“非之世界”实现没有痛苦的终极虚无。当空甲与假面被撕碎时，终化为全游戏最终裁决者混沌言昭。"
  }
],
  chapters: [
  {
    "id": "ch00_prologue",
    "index": 0,
    "category": "chapter",
    "title": "序章：晨辉的异变",
    "party": "opening_light",
    "boss_id": "goblin",
    "boss_name": "突击哥布林头目",
    "dungeon_name": "始源神殿外围 (map-01)",
    "recommended_level": "Lv 1 - 5",
    "rewards": "基础旅行军备、帐篷、青之月水晶残片",
    "summary": "晨辉国四人受命调查始源神殿。途遇预言者言昭，晶石已开始躁动。",
    "overview": "晨辉王国边境地脉激荡，远古始源神殿升起耀眼光柱。国王召集卫珩与年少弟子黎川，会同秘法都神官昼隐紧急调查。途中救助了神秘预言者言昭，神殿深处的四原色晶石出现前所未见的共振撕裂征兆。"
  },
  {
    "id": "ch01_reckoning",
    "index": 1,
    "category": "chapter",
    "title": "第1章：晶石碎裂",
    "party": "both",
    "boss_id": "astor",
    "boss_name": "掠夺者·重装机甲",
    "dungeon_name": "始源神殿祭坛最深处",
    "recommended_level": "Lv 6 - 8",
    "rewards": "初始自由人能力盘解锁、世界航图",
    "summary": "永曜迫使囚徒夺取晶石。两队在神殿相遇，晶石主动分裂世界，人员被重新混编。",
    "overview": "永曜帝国死囚纳哈特被强加奴役铭文，奉命突击始源神殿夺取水晶。光暗两队在祭坛展开激烈交锋，然而晶石在两极能量冲击下轰然破碎，宏大的引力风暴将大地撕裂为光之世界与暗之世界，两队伙伴亦被打散重组。"
  },
  {
    "id": "ch02_dragoon",
    "index": 2,
    "category": "chapter",
    "title": "第3–4章：光队·龙骑士之证",
    "party": "light",
    "boss_id": "wyvern_whelp",
    "boss_name": "暴风古龙狂暴体",
    "dungeon_name": "苍穹绝壁·龙栖岭",
    "recommended_level": "Lv 9 - 14",
    "rewards": "龙骑士转职石板、飞龙呼唤笛、弑龙矛原型",
    "summary": "光队坠入龙栖岭。女龙骑士苍岚与飞龙重建对人类的信任，留下龙骑士传承。",
    "overview": "黎川与卫珩坠落于悬崖孤峰龙栖岭，遇到重伤濒死的末代飞龙与性情孤傲的女龙骑士苍岚。众人突破帝国飞龙猎杀队的重重围猎，以纯粹的骑士道拯救幼龙，苍岚将象征天空霸主的龙骑士枪术托付给光之战士。"
  },
  {
    "id": "ch03_ranger",
    "index": 3,
    "category": "chapter",
    "title": "第5–6章：暗队·失明的猎人",
    "party": "dark",
    "boss_id": "vampire",
    "boss_name": "寄生妖木·伪精灵王",
    "dungeon_name": "迷宫神木·世界树回廊",
    "recommended_level": "Lv 15 - 20",
    "rewards": "神射手弓石板、乱打核心印记、妖精之弓",
    "summary": "暗队在世界树揭穿假精灵王。失明老弓手枯枝留下猎人传承。",
    "overview": "纳哈特与澄月穿过枯萎的妖精密林，发现被幻术操纵的世界树王廷。失明的隐退神射手枯枝以心眼感知真相，暗队配合老猎人直插地脉核心斩杀寄生妖木。枯枝临终前传授了神技乱打的奥义。"
  },
  {
    "id": "ch04_bard",
    "index": 4,
    "category": "chapter",
    "title": "第7–9章：光队·诗人的悲歌",
    "party": "light",
    "boss_id": "kraken",
    "boss_name": "深渊海妖克拉肯",
    "dungeon_name": "沉没圣所·人鱼湾",
    "recommended_level": "Lv 21 - 25",
    "rewards": "吟游诗人传承、阿波罗之竖琴残片、人鱼之泪",
    "summary": "人鱼湾的恋情以悲剧收束。歌声承载记忆，光队继承诗人。",
    "overview": "为了获取穿越风暴之海的海潮之歌，光队驻足人鱼湾。岸上年轻诗人与深海人鱼相恋却触犯禁忌，最终以凄美的海潮挽歌唤醒沉睡的大陆之舟。诗人将歌声化作战斗中的绝美颂歌传承给昼隐。"
  },
  {
    "id": "ch05_dark_knight",
    "index": 5,
    "category": "chapter",
    "title": "第10–12章：暗队·徘徊的黑甲",
    "party": "dark",
    "boss_id": "lich",
    "boss_name": "死灵统领巫妖 (Lich)",
    "dungeon_name": "焦土烬堡废墟 / 地之洞窟深层",
    "recommended_level": "Lv 26 - 32",
    "rewards": "暗黑骑士职业纹章、名刀鬼彻断刃、暗黑抗性护甲",
    "summary": "烬堡废墟揭开纳哈特父亲的遗恨。暗黑骑士是守护与承担，不是腐化。言昭在飞空艇上表面牺牲。",
    "overview": "暗队踏入被烈焰焚毁十年的烬堡故地。纳哈特面对巫妖唤醒的亡父英灵与黑铠幻影，战胜心魔证明了暗黑之力的真谛在于‘为庇护至亲而负罪’。战局急转直下，言昭为掩护暗队破坏帝国飞空艇，表面坠入烈焰殉难。"
  },
  {
    "id": "ch06_memorist",
    "index": 6,
    "category": "chapter",
    "title": "第13–15章：光队·记忆的人造者",
    "party": "light",
    "boss_id": "marilith",
    "boss_name": "炽焰多臂魔·六刀女妖",
    "dungeon_name": "魔导兵工厂·织造城核心",
    "recommended_level": "Lv 33 - 38",
    "rewards": "记忆师职业符石、记忆结晶无属性魔杖",
    "summary": "织造城的人造生命忆纱从兵器核心成长为有选择的主体，留下记忆师传承。",
    "overview": "光队潜入帝国地下魔导织造城，目睹无数人造生命被当做晶石消耗品的惨状。作为兵器核心少女忆纱在茜罗的感化下萌生自我意识，在最终自毁阻断流水线之际，将收集的数百年文明记忆结晶赠予光队。"
  },
  {
    "id": "ch07_dancer",
    "index": 7,
    "category": "chapter",
    "title": "第16–18章：暗队·战场的舞步",
    "party": "dark",
    "boss_id": "astor",
    "boss_name": "沙海处刑官·斩铁重骑",
    "dungeon_name": "黄沙要塞·沙月城地下斗技场",
    "recommended_level": "Lv 39 - 44",
    "rewards": "舞者职业扇、治愈华尔兹技能、满月发饰",
    "summary": "沙月城误信间谍导致据点被屠。暗队第一次为行动后果负责，获得舞者传承。",
    "overview": "暗队在沙月城结识反抗军，却因误信帝国伪装间谍导致秘密据点遭遇屠城。澄月在鲜血与沙尘中领悟到舞步不仅是优美的艺术，更是致命的斩首战阵。暗队彻底完成从被动反叛到主动抗击帝国的心态蜕变。"
  },
  {
    "id": "ch08_paladin",
    "index": 8,
    "category": "chapter",
    "title": "第19–20章：光队·骑士的复职",
    "party": "light",
    "boss_id": "lich",
    "boss_name": "堕落统领·亡灵戈闻",
    "dungeon_name": "古王遗都圣陵",
    "recommended_level": "Lv 45 - 50",
    "rewards": "圣骑士职业石、圣剑阿斯托尔福线索、宙斯之盾",
    "summary": "茜罗正视王族责任，唤醒酒徒戈闻。光队继承圣骑士，为尾声加冕奠基。",
    "overview": "茜罗回到满目疮痍的古王遗都，昔日第一骑士团长戈闻自暴自弃沦为酒徒。茜罗以王族真名宣告赦免与征召，卫珩与其并肩肃清侵入圣陵的死灵军团。戈闻在悔恨中重拾佩剑力战捐躯，光队正式继承圣骑士大统。"
  },
  {
    "id": "ch09_ninja",
    "index": 9,
    "category": "chapter",
    "title": "第21–22章：暗队·影乡的命运",
    "party": "dark",
    "boss_id": "marilith",
    "boss_name": "暗影判官·八刀幻影",
    "dungeon_name": "迷雾深渊·鬼子岛神殿 (map-03)",
    "recommended_level": "Lv 51 - 58",
    "rewards": "忍者传承秘卷、二刀流被动石板、草薙之剑",
    "summary": "影乡内斗被帝国利用。独臂忍者刃无离队但未明示死亡，留下忍者传承。",
    "overview": "刃歌带领暗队踏上海外绝境鬼子岛，发现影之秘里已遭帝国傀儡政权渗透并展开残酷自相残杀。独臂大宗师刃无为掩护年轻人独战八首大蛇机关，暗队在九死一生中顿悟神技二刀流并取得神器草薙之剑。"
  },
  {
    "id": "ch10_twilight",
    "index": 10,
    "category": "chapter",
    "title": "第23–25章：黄昏篇·两个世界的接合",
    "party": "both",
    "boss_id": "chaos",
    "boss_name": "时空撕裂者·双生魔神",
    "dungeon_name": "两界交汇点·黄昏次元塔",
    "recommended_level": "Lv 59 - 68",
    "rewards": "贤者石板、大魔道士石板、连续魔终极徽章",
    "summary": "光队获贤者、暗队获魔道士。世界合并却停在黄昏，生命被抽向非之世界。重逢只是终章门槛。",
    "overview": "光暗八位战士终于在黄昏次元塔迎来时隔两年的重聚！然而世界的物理合并并未带来曙光，天空永远定格在诡异的残阳黄昏。大陆各大板块的生命力被无形虚空疯狂抽取，真正的幕后操盘手浮出水面。"
  },
  {
    "id": "ch11_finale_one",
    "index": 11,
    "category": "chapter",
    "title": "第26–28章：永曜的空甲",
    "party": "united",
    "boss_id": "chaos",
    "boss_name": "帝国空皇·虚无重铠",
    "dungeon_name": "永曜帝都飞空要塞·浮空王座",
    "recommended_level": "Lv 69 - 80",
    "rewards": "全知贤者法杖、弑龙神枪全解限、暗物质晶核",
    "summary": "收集八道裂口中的暗物质，新晶石打破屏障。帝都的皇帝只是一副空甲。",
    "overview": "八大主角联合突入防卫森严的永曜帝都浮空要塞。突破十二道结界斩下皇帝头颅时，震惊地发现端坐王座之上的仅是一具被虚无魔力驱动的冰冷空甲。真正的皇帝言昭现身，揭开双月纪元最大的欺骗。"
  },
  {
    "id": "ch12_finale_two",
    "index": 12,
    "category": "chapter",
    "title": "第29–30章：非之世界",
    "party": "united",
    "boss_id": "chaos",
    "boss_name": "混沌裁决者·言昭终极体",
    "dungeon_name": "次元尽头·非之世界虚无祭坛",
    "recommended_level": "Lv 81 - 99",
    "rewards": "十二传说神兵全部解锁、世界重塑黎明、通关特权通牒",
    "summary": "言昭即皇帝。击败混沌言昭后世界恢复。昼隐与夜织被救回。尾声只明示三位归宿，其余留白。",
    "overview": "全员坠入万物归无的‘非之世界’展开全剧最终决战。面对能够操纵时空法则与因果律的混沌言昭，光与暗两股原本对立的力量在此交融为终极的光辉。言昭战败消散后，双月世界终归黎明，八位英雄各自迈向未写尽的余生。"
  }
],
  equipment: [
  {
    "id": "eq-01",
    "category": "equipment",
    "name": "弑龙神枪",
    "type": "双手长枪",
    "job": "龙骑士 / 自由人",
    "stats": "攻击力 +165, 暴击率 +20%",
    "effect": "对飞龙与蛇龙系物种造成 3 倍真实特攻，跳跃技能伤害增幅 50%",
    "origin": "49层深渊竞技场 守关首领掉落",
    "rarity": "★★★★★ 唯一限定神器"
  },
  {
    "id": "eq-02",
    "category": "equipment",
    "name": "名刀鬼彻",
    "type": "双手太刀",
    "job": "武士 / 忍者",
    "stats": "攻击力 +158, 敏捷 +15",
    "effect": "自带居合拔刀术，击中敌人 25% 概率触发无视防御一刀两断",
    "origin": "49层深渊竞技场 30F Boss宝箱",
    "rarity": "★★★★★ 唯一限定神器"
  },
  {
    "id": "eq-03",
    "category": "equipment",
    "name": "圣剑阿斯托尔福",
    "type": "单手圣剑",
    "job": "圣骑士 / 战士",
    "stats": "攻击力 +170, 圣属性, 全防御 +30",
    "effect": "装备者获得全异常状态免疫，攻击不死系与恶魔造成 2.5 倍圣圣光爆裂",
    "origin": "49层深渊竞技场 15F Boss宝箱",
    "rarity": "★★★★★ 唯一限定神器"
  },
  {
    "id": "eq-04",
    "category": "equipment",
    "name": "全知贤者法杖",
    "type": "双手长杖",
    "job": "贤者 / 白魔道士 / 黑魔道士",
    "stats": "魔力 +35, 魔法攻击 +180",
    "effect": "全系黑白魔法 MP 消耗降低 50%，施放攻击法术有 20% 概率连续双发",
    "origin": "49层深渊竞技场 10F Boss宝箱",
    "rarity": "★★★★★ 唯一限定神器"
  },
  {
    "id": "eq-05",
    "category": "equipment",
    "name": "深渊裁决之刃",
    "type": "单手大剑",
    "job": "暗黑骑士 / 自由人",
    "stats": "攻击力 +175, 速度 +10",
    "effect": "附带暗属性吸血（将造成伤害的 15% 转化为自身 HP），普通攻击不可闪避",
    "origin": "49层深渊竞技场 1F 终极守关战果",
    "rarity": "★★★★★ 终焉唯一神器"
  },
  {
    "id": "eq-06",
    "category": "equipment",
    "name": "草薙之剑",
    "type": "单手神剑",
    "job": "忍者 / 骑士 / 盗贼",
    "stats": "攻击力 +145, 速度 +12",
    "effect": "风属性烈风加持，击中时有 30% 概率削减目标 35% 物理防御持续 3 回合",
    "origin": "鬼子岛八岐神殿 9F 击破八岐大蛇战果",
    "rarity": "★★★★★ 远古神器"
  },
  {
    "id": "eq-07",
    "category": "equipment",
    "name": "宙斯之盾 (Aegis Shield)",
    "type": "重盾",
    "job": "圣骑士 / 骑士",
    "stats": "物理防御 +65, 魔法防御 +40, 闪避率 +25%",
    "effect": "完全阻断石化、混乱、魅惑与即死状态，格挡成功时反弹 20% 近战反伤",
    "origin": "海角港口高级黑市购得",
    "rarity": "★★★★ 传世防具"
  },
  {
    "id": "eq-08",
    "category": "equipment",
    "name": "阿波罗之琴",
    "type": "竖琴",
    "job": "吟游诗人 / 自由人",
    "stats": "攻击力 +110, 精神 +25",
    "effect": "圣属性攻击，对龙族、不死族附带 3 倍特攻；演唱技能持续时间翻倍",
    "origin": "弦月岛集齐八大城镇钢琴演奏向隐士老诗人换取",
    "rarity": "★★★★ 乐圣传承"
  },
  {
    "id": "eq-09",
    "category": "equipment",
    "name": "大师指挥棒",
    "type": "副手短棒",
    "job": "吟游诗人 / 时魔道士",
    "stats": "速度 +18, 物理闪避 +30%",
    "effect": "演唱节拍启动延迟消除，每回合行动条初始预充能 30%",
    "origin": "弦月岛乐圣隐士老诗人伴生奖励",
    "rarity": "★★★★ 乐圣专属"
  },
  {
    "id": "eq-10",
    "category": "equipment",
    "name": "护盾指环 (Shield Ring)",
    "type": "饰品",
    "job": "全职业通用",
    "stats": "物理防御 +15, 魔法防御 +10",
    "effect": "战斗开场自动赋予自身 Protect 圣盾（物理防御提升 50%）持续全场",
    "origin": "古代大图书馆宝箱 / 支线商人",
    "rarity": "★★★ 实用特防饰品"
  },
  {
    "id": "eq-ragnarok",
    "category": "equipment",
    "name": "诸神之黄昏 (Ragnarok)",
    "type": "单手圣剑 / 骑士巨剑",
    "job": "圣骑士 / 自由人 / 纳哈特",
    "stats": "攻击力 +180, 全属性 +10, 暴击率 +30%",
    "effect": "至高超越神兵：普通攻击无视敌方 50% 物理防御，普攻 20% 概率触发【圣光核爆 (Flare)】，对龙族与恶魔造成 300% 灭绝暴击",
    "origin": "次元之隙 隐藏深渊宝箱 (击破守护神兽·神龙掉落) / 月之地下溪谷 8F",
    "rarity": "★★★★★★★ 终焉超越神级 (SSR+)"
  },
  {
    "id": "eq-ragnarok-kai",
    "category": "equipment",
    "name": "终焉诸神之黄昏·改",
    "type": "纳哈特专属漆黑大剑",
    "job": "纳哈特 / 暗黑骑士 / 自由人",
    "stats": "攻击力 +200, 敏捷 +15, 吸血 +20%",
    "effect": "纳哈特专属暗黑极意神剑：暗黑战技伤害提升 50%，平砍 100% 附带生命汲取，暴击触发【虚无湮灭波】全场真实冲击",
    "origin": "49层倒序深渊竞技场 极限通关唯一绝品奖励",
    "rarity": "★★★★★★★ 终焉超越神级 (SSR+)"
  },
  {
    "id": "eq-rune-staff",
    "category": "equipment",
    "name": "诸神之杖 (Rune Staff)",
    "type": "双手长杖",
    "job": "白魔导士 / 时空魔导士 / 贤者",
    "stats": "魔法攻击 +175, 魔力 +15, 咏唱加速 +30%",
    "effect": "全白魔法与时空禁术效能提升 1.5 倍；普攻消耗 5 MP 自动转化为圣属性穿甲真实伤害",
    "origin": "孤岛斗技场 12,000 BP 终极大奖",
    "rarity": "★★★★★★ 极古战魂神杖"
  },
  {
    "id": "eq-ragnarok-armor",
    "category": "equipment",
    "name": "诸神之铠 (Ragnarok Armor)",
    "type": "终极重装防具",
    "job": "骑士 / 重铠护卫 / 自由人",
    "stats": "物理防御 +75, 魔法防御 +60",
    "effect": "常驻【永久白刃战减伤 30%】与【全异常状态绝对免疫】；受到火/水/雷/冰元素伤害时自动吸收 20% 为自身生命",
    "origin": "次元之隙 机械瀑布宝箱 (远古兵器欧米茄巡逻区)",
    "rarity": "★★★★★★ 终极防具"
  },
  {
    "id": "eq-masamune",
    "category": "equipment",
    "name": "正宗 (Masamune)",
    "type": "双手太刀",
    "job": "武士 / 忍者 / 自由人",
    "stats": "攻击力 +168, 敏捷 +20, 暴击率 +25%",
    "effect": "【战斗绝对先攻特权】：装备者在任何战斗中必定开局最先行动（ATB 满格先手）；使用指令自动施放【急速 (Haste)】",
    "origin": "月之地下溪谷 8F 祭坛战利品",
    "rarity": "★★★★★★ 传说拔刀神器"
  },
  {
    "id": "eq-personal-2120",
    "category": "equipment",
    "name": "终焉诸神之黄昏 (ID: 2120)",
    "type": "单手剑 (纳哈特个人专属)",
    "job": "纳哈特 (Nahart) 专属",
    "stats": "攻击力 +120",
    "effect": "纳哈特专属佩剑：本人三暗技伤害增幅 40%；普攻命中后最多转移 10 点 MP 补充自身。",
    "origin": "暗队领袖专属记忆试炼 (Trial 2120)",
    "rarity": "★★★★★ 英雄专属武装"
  },
  {
    "id": "eq-personal-2121",
    "category": "equipment",
    "name": "圣洁涅槃 (ID: 2121)",
    "type": "单手法杖 (塞拉个人专属)",
    "job": "塞拉 (Sera) 专属",
    "stats": "攻击力 +50, 魔法攻击 +30, 精神 +10",
    "effect": "塞拉专属法杖：本人施放己方治疗法术 MP 消耗减半；整场战斗一次濒死自动 25% 生命复活。",
    "origin": "白魔导师专属记忆试炼 (Trial 2121)",
    "rarity": "★★★★★ 英雄专属武装"
  },
  {
    "id": "eq-personal-2122",
    "category": "equipment",
    "name": "神圣神盾 (ID: 2122)",
    "type": "圣盾 (埃癸斯个人专属)",
    "job": "埃癸斯 (Aegis) 专属",
    "stats": "物理防御 +40, 魔法防御 +20",
    "effect": "埃癸斯专属重盾：本人免疫一切敌方物理暴击；整场战斗一次为濒死队友承受致命单体物理打击。",
    "origin": "铁壁骑士专属记忆试炼 (Trial 2122)",
    "rarity": "★★★★★ 英雄专属武装"
  },
  {
    "id": "eq-personal-2123",
    "category": "equipment",
    "name": "龙王破邪枪 (ID: 2123)",
    "type": "长枪 (格雷夫个人专属)",
    "job": "格雷夫 (Grave) 专属",
    "stats": "攻击力 +118",
    "effect": "格雷夫专属战枪：跳跃 (Jump) 技能发动后当回合即时落地突刺，免去滞空等待回合。",
    "origin": "龙骑苍岚专属记忆试炼 (Trial 2123)",
    "rarity": "★★★★★ 英雄专属武装"
  },
  {
    "id": "eq-personal-2124",
    "category": "equipment",
    "name": "极光创世剑 (ID: 2124)",
    "type": "单手剑 (索尔个人专属)",
    "job": "索尔 (Sol) 专属",
    "stats": "攻击力 +120",
    "effect": "索尔专属圣剑：正伤威力与当前 HP 呈高正相关，满生命状态释放极光破邪斩威力倍增。",
    "origin": "光之勇士专属记忆试炼 (Trial 2124)",
    "rarity": "★★★★★ 英雄专属武装"
  },
  {
    "id": "eq-sealed-2100",
    "category": "equipment",
    "name": "王者之剑 (Excalibur, ID: 2100)",
    "type": "单手圣剑 (太古封印神兵)",
    "job": "骑士 / 圣骑士 / 自由人",
    "stats": "攻击力 +115, 圣属性",
    "effect": "太古封印十二神兵之首：挥舞圣光斩击，对不死系与恶魔具备强效圣光特攻。禁止副手佩戴。",
    "origin": "封印之城库扎 拔剑解封",
    "rarity": "★★★★★ 太古封印神兵"
  },
  {
    "id": "eq-sealed-2101",
    "category": "equipment",
    "name": "名刀·正宗 (Masamune, ID: 2101)",
    "type": "太刀 (太古封印神兵)",
    "job": "武士 / 忍者 / 自由人",
    "stats": "攻击力 +106, 暴击率 +15%",
    "effect": "太古封印神兵：锋利绝伦的传世宝刀，战斗中使用可释放急速术 (Haste)。禁止副手佩戴。",
    "origin": "封印之城库扎 拔刀解封",
    "rarity": "★★★★★ 太古封印神兵"
  },
  {
    "id": "eq-sealed-2102",
    "category": "equipment",
    "name": "佐助之刀 (Sasuke's Katana, ID: 2102)",
    "type": "忍者忍刀 (太古封印神兵)",
    "job": "忍者 / 盗贼 / 自由人",
    "stats": "攻击力 +99, 速度 +6",
    "effect": "太古封印神兵：赋予持握者极高身法，速度敏捷大幅提升，闪避率 +15%。禁止副手佩戴。",
    "origin": "封印之城库扎 解封获取",
    "rarity": "★★★★★ 太古封印神兵"
  },
  {
    "id": "eq-sealed-2103",
    "category": "equipment",
    "name": "毁灭之斧 (Rune Axe, ID: 2103)",
    "type": "单手重斧 (太古封印神兵)",
    "job": "狂战士 / 战士 / 自由人",
    "stats": "攻击力 +71",
    "effect": "太古封印神兵：消耗少量 MP 激发符文毁灭之力，打出必定暴击真伤。禁止副手佩戴。",
    "origin": "封印之城库扎 解封获取",
    "rarity": "★★★★★ 太古封印神兵"
  },
  {
    "id": "eq-sealed-2104",
    "category": "equipment",
    "name": "封印圣枪 (Holy Lance, ID: 2104)",
    "type": "长柄圣枪 (太古封印神兵)",
    "job": "龙骑士 / 自由人",
    "stats": "攻击力 +109, 圣属性",
    "effect": "太古封印神兵：高空跳跃突刺时引发神圣净化爆裂，对飞行与不死系致命打击。禁止副手佩戴。",
    "origin": "封印之城库扎 解封获取",
    "rarity": "★★★★★ 太古封印神兵"
  },
  {
    "id": "eq-sealed-2105",
    "category": "equipment",
    "name": "与一之弓 (Yoichi's Bow, ID: 2105)",
    "type": "双手神弓 (太古封印神兵)",
    "job": "猎人 / 游侠 / 自由人",
    "stats": "攻击力 +101, 双手持握",
    "effect": "太古封印神兵：百步穿杨的神射之弓，命中率 100%，双手开弓强制无法佩戴盾牌。",
    "origin": "封印之城库扎 解封获取",
    "rarity": "★★★★★ 太古封印神兵"
  },
  {
    "id": "eq-sealed-2106",
    "category": "equipment",
    "name": "火焰之鞭 (Fire Lash, ID: 2106)",
    "type": "长鞭 (太古封印神兵)",
    "job": "驯兽师 / 魔兽使 / 自由人",
    "stats": "攻击力 +82, 火属性",
    "effect": "太古封印神兵：命中目标时 33% 几率自发诱发三阶烈炎术 (Firaga) 追击。禁止副手佩戴。",
    "origin": "封印之城库扎 解封获取",
    "rarity": "★★★★★ 太古封印神兵"
  },
  {
    "id": "eq-sealed-2107",
    "category": "equipment",
    "name": "贤者之杖 (Sage's Staff, ID: 2107)",
    "type": "法杖 (太古封印神兵)",
    "job": "白魔道士 / 导师 / 自由人",
    "stats": "攻击力 +53, 圣属性强化",
    "effect": "太古封印神兵：大幅增幅白魔法威力，对不死生物敲击触发神圣斩灭。禁止副手佩戴。",
    "origin": "封印之城库扎 解封获取",
    "rarity": "★★★★★ 太古封印神兵"
  },
  {
    "id": "eq-sealed-2108",
    "category": "equipment",
    "name": "巫师之杖 (Magus Rod, ID: 2108)",
    "type": "魔杖 (太古封印神兵)",
    "job": "黑魔道士 / 魔导士 / 自由人",
    "stats": "攻击力 +40, 全元素强化",
    "effect": "太古封印神兵：火、冰、雷全元素黑魔法伤害增幅 50%。禁止副手佩戴。",
    "origin": "封印之城库扎 解封获取",
    "rarity": "★★★★★ 太古封印神兵"
  },
  {
    "id": "eq-sealed-2109",
    "category": "equipment",
    "name": "大地之铃 (Gaia Bell, ID: 2109)",
    "type": "乐器 (太古封印神兵)",
    "job": "风水师 / 自由人",
    "stats": "攻击力 +35, 地属性强化",
    "effect": "太古封印神兵：共鸣大地脉动，大幅提升自然地形地形术发动威力与成功率。禁止副手佩戴。",
    "origin": "封印之城库扎 解封获取",
    "rarity": "★★★★★ 太古封印神兵"
  },
  {
    "id": "eq-sealed-2110",
    "category": "equipment",
    "name": "封印刺客匕首 (Assassin Dagger, ID: 2110)",
    "type": "短剑 (太古封印神兵)",
    "job": "盗贼 / 忍者 / 自由人",
    "stats": "攻击力 +81, 敏捷 +3",
    "effect": "太古封印神兵：暗杀者之刃，普攻命中目标时附带概率即死 (Death) 判定。禁止副手佩戴。",
    "origin": "封印之城库扎 解封获取",
    "rarity": "★★★★★ 太古封印神兵"
  }
],
  magic: [
  {
    "id": "mg-01",
    "category": "magic",
    "name": "终极陨石术 (Meteor)",
    "type": "九阶禁断黑魔法",
    "cost": "MP 64",
    "target": "敌方全体",
    "effect": "召唤外太空炽热彗星连续 4 波砸击战场，造成无视常规魔抗的混沌毁灭伤害。",
    "origin": "远古大图书馆深层禁断密室"
  },
  {
    "id": "mg-02",
    "category": "magic",
    "name": "治愈华尔兹 (Healing Waltz)",
    "type": "高阶白魔法 / 舞步",
    "cost": "MP 38",
    "target": "我方全体",
    "effect": "华丽起舞为全体队员恢复超大量 HP，并同步解除中毒、盲目、沉默与睡眠。",
    "origin": "人鱼湾诗人支线"
  },
  {
    "id": "mg-03",
    "category": "magic",
    "name": "圣歌·生命再临",
    "type": "吟游诗人八曲终极",
    "cost": "MP 45",
    "target": "我方全体",
    "effect": "复活全体已阵亡同伴，并立即回复 50% 最大生命值。",
    "origin": "弦月岛八级钢琴乐圣奖励"
  },
  {
    "id": "mg-04",
    "category": "magic",
    "name": "虚空诅咒 (Void Curse)",
    "type": "暗黑特技 / 青魔法",
    "cost": "MP 52",
    "target": "敌方全体",
    "effect": "释放红之月引力暗影侵蚀，施加衰竭、失明与持续失血 Debuff。",
    "origin": "次元之隙虚空系怪物处研习"
  },
  {
    "id": "mg-05",
    "category": "magic",
    "name": "青魔法·自爆",
    "type": "青魔法 (Blue Magic)",
    "cost": "MP 1",
    "target": "敌方单体",
    "effect": "牺牲自身当前全部 HP，对目标造成等额的真实纯粹伤害，对高血量 Boss 具毁灭打击力。",
    "origin": "炸弹怪 (Bomb) 濒死时自爆习得"
  },
  {
    "id": "mg-06",
    "category": "magic",
    "name": "青魔法·十万伏特",
    "type": "青魔法 (Blue Magic)",
    "cost": "MP 28",
    "target": "敌方全体",
    "effect": "释放高压雷暴电弧，对机械与飞行属性单位造成 3 倍破甲雷击并附带麻痹。",
    "origin": "恶魔机兵或水母放电怪习得"
  }
],
  maps: [
  {
    "id": "map-01",
    "category": "map",
    "name": "始源神殿 (Shrine of Origin)",
    "type": "主线序章遗迹",
    "features": "原初晶石所在地、言昭初登场、世界分裂裂痕",
    "monsters": "小黄蜂、哥布林、强盗头目",
    "desc": "立于青之月地脉节点中央的古代神殿，四大原初水晶由此发生首次剧烈共振分裂。"
  },
  {
    "id": "map-02",
    "category": "map",
    "name": "49层深渊竞技场 (Coliseum Abyss)",
    "type": "世界毁灭后终极地下城",
    "features": "倒序层级 (49F至1F)、4位同伴动态语音线索、血幕机关解密、限定唯一职业神兵",
    "monsters": "深渊虚空魔物、深渊守关裁决者、暗影古龙",
    "desc": "空间重组后撕裂的终极挑战回廊，全暗怪随机遭遇，经验递增封顶，全灭直接 Game Over。"
  },
  {
    "id": "map-03",
    "category": "map",
    "name": "鬼子岛八岐神殿 (Oni Isle)",
    "type": "九层高难机关神殿",
    "features": "3F毒血池步距扣血、4F重石像升降梯移位、5F村正之灵、7F绝魔回廊MP锁0、9F八首大蛇 (火焰/冰霜/雷电/剧毒/大地/狂风/神圣/虚无 八大异相首)",
    "monsters": "鬼武者、毒血史莱姆、村正之灵、八岐大蛇 (8目标复合Boss)",
    "desc": "东方海外孤立的禁断鬼岛，层层机关杀机四伏。9F八岐御座驻扎着八首大蛇（掌握炎/冰/雷/毒/地/风/圣/虚八重属性异能），是取得神器草薙之剑的唯一试炼所。"
  },
  {
    "id": "map-04",
    "category": "map",
    "name": "沼泽洞窟 B1~B3 (Marsh Cave)",
    "type": "经典地下迷宫",
    "features": "双向楼梯、B3十六室、18个宝箱分布、守卫夺灵魔、王冠与神秘钥匙剧情链",
    "monsters": "灰色泥浆怪、石像鬼、血髅战士、夺灵魔、巨蟒",
    "desc": "地底泥沼迷宫，王冠由四名夺灵魔封锁守卫，深处隐藏有必须持有神秘钥匙才可开启的暗室。"
  },
  {
    "id": "map-05",
    "category": "map",
    "name": "幻影之村 (Mirage Village)",
    "type": "隐藏世外避难所",
    "features": "时空停滞隐蔽点、高阶魔法前店、地下黑市、第8架游荡琴师钢琴",
    "monsters": "无（安全村落）",
    "desc": "只有在大地图特定隐秘密林通过次元缝隙方可踏入的黑市村落，出售全大陆最精良的禁忌装备。"
  },
  {
    "id": "dungeon-highwind-tower",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "高风塔 (Highwind Tower · 1F厩门厅 / 2F风道 / 3F飞龙巢台)",
    "type": "龙栖圣塔与契约地宫",
    "features": "大地图入口 (480, 620)、三层楼梯连通 (1F厩门厅 &rarr; 2F风道 &rarr; 3F飞龙巢台)、守护飞龙 HighwindDragon 专属平台",
    "monsters": "无（3F顶层飞龙巢台驻守高风神龙 HighwindDragon）",
    "mechanics": "完成龙栖岭【飞龙信任 (ch02_restore_trust)】事件后解锁大地图唯一入口。塔内无普通遇敌，是龙骑士与飞龙签订神圣羁绊的试炼圣所。",
    "desc": "最新录入《全域地理志 (regions_v1.json)》的龙栖三大楼层高塔：1F厩门厅直通大陆、2F环回风道阻挡狂风、3F塔顶飞龙巢台栖息着高风神龙。"
  },
  {
    "id": "dungeon-longqi-inner",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "飞龙巢·内巢 (Longqi Inner Nest)",
    "type": "龙栖天险深处安全探索地宫",
    "features": "飞龙巢北洞口 (640, 200) 直达、InnerNest (内巢主龙窝)、InnerEggClutch (守护龙蛋窝)、返回飞龙巢南洞口 (640, 880)",
    "monsters": "无（洞窟地貌隔绝室外恶劣气候，安全探索区）",
    "mechanics": "飞龙巢深层洞窟内巢。由飞龙巢北侧洞口深入，呈现古老龙栖悬崖岩道与巨型内巢主龙窝、带碰撞的守护龙蛋窝，属于龙骑士救助飞龙的重要隐秘场所。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《区域等级志 (area_levels.json)》的龙栖天险延伸洞窟：Lv.9~14 安全探索区，南侧洞口原路返回飞龙巢。"
  },
  {
    "id": "dungeon-yggdrasil-root",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "世界树·树根空腔 (Yggdrasil Root Hollow)",
    "type": "精灵巨木深层安全观览地宫",
    "features": "世界树右侧舱门 (1080, 360) 接入、AncientRoots (远古巨木粗根实体)、两侧细根观览通道、返回世界树南侧出口 (640, 880) 对应世界树 (1080, 440)",
    "monsters": "无（幽暗泥土根部安全观览区，无普通遇敌）",
    "mechanics": "世界树巨木下半部根须空腔。复用林地碰撞与幽暗泥土色地貌，中央粗根巍峨耸立，两侧细根自然延伸出环绕观览环道，南侧出口原路返回世界树主庭。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的世界树下层延伸空腔：安全探索区，专注呈现千年古木苍茫根系与幽暗林地生态。"
  },
  {
    "id": "dungeon-mermaid-trench",
    "category": "map",
    "tier": "深海与海沟层 (Abyssal Ocean Tier)",
    "name": "人鱼湾·珊瑚海沟 (Mermaid Coral Trench)",
    "type": "深海珊瑚潮沟安全探索区",
    "features": "海底母图新门 (1064, 360) 接入、潮沟海床珊瑚群落、返回海底母图南侧出口 (640, 880) 对应母图 (1080, 440)",
    "monsters": "无（深海珊瑚礁洞窟地貌，安全观览区，无普通遇敌）",
    "mechanics": "人鱼湾海底聚居地下层延伸潮沟。复用深海海床珊瑚与贝母岩道，避开原三珠贝与浮出通道，安全双向连通海底聚居地，属于深海生态重要景观。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的人鱼湾海底深层延伸潮沟：全域地区名录第 90 条，安全观览区。"
  },
  {
    "id": "dungeon-old-kingdom-crypt2",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "古王陵·下层地宫 (Old Kingdom Crypt 2)",
    "type": "古骑士王朝下层陵墓安全探索地宫",
    "features": "母王陵右门 (1080, 360) 接入、LowerMemorialCenter (下层主陵石棺)、两侧先王纪念立柱、返回母王陵南门 (640, 880) 对应母图 (1080, 440)",
    "monsters": "无（古王朝石殿地貌，安全探索区，无普通遇敌）",
    "mechanics": "古王陵下层地宫深处。复用旧王朝石地墙、王室石棺与纪念立柱，保留原守墓人与藏室传奇奖励资格，全域地区名录第 91 条。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的古王陵下层地宫：Lv.25~28 安全观览区，展现远古骑士王朝陵寝深邃庄严的建筑格局。"
  },
  {
    "id": "dungeon-lufenia-core",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "鲁菲尼亚·核心舱室 (Lufenia Core Chamber)",
    "type": "超古代魔导机械核心安全探索舱",
    "features": "遗迹东侧新门 (1080, 360) 接入、WestConduit / EastConduit (双翼能量导管)、CenterCoreUnit (中央构装核心)、返回遗迹南口 (640, 880) 对应母图 (1080, 440)",
    "monsters": "无（超古代金属构装地貌，安全探索区，无普通遇敌）",
    "mechanics": "鲁菲尼亚失落遗迹核心舱室。复用金属回廊地貌与帝国能量导管，避开原终端与充能星图，安全双向连通遗迹主回廊，全域地区名录第 92 条。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的失落遗迹魔道核：Lv.32~36 超古代文明工艺圣域，展现中央构装机械与能量循环系统。"
  },
  {
    "id": "dungeon-mysidia-cave",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "米西迪亚·秘法洞厅 (Mysidia Cave Stair Hall)",
    "type": "秘法古都首层洞阶安全探索厅",
    "features": "秘法都母图 (1120, 560) 侧门接入、WestCrystal / EastCrystal (双秘法晶簇)、封闭石阶回廊、返回秘法都南门 (640, 880) 对应母图 (1120, 640)",
    "monsters": "无（神殿石阶洞窟地貌，安全探索区，无普通遇敌）",
    "mechanics": "秘法都下层首层洞阶回廊。避开母图守望者巡逻路线，复用封闭石墙与双晶簇景观，石阶为可走地表，全域地区名录第 93 条。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的秘法洞阶：Lv.32~36 学术圣殿深层洞厅，呈现星象魔法粒子共鸣的晶簇与石阶空间。"
  },
  {
    "id": "dungeon-elf-white-treehouse",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "艾尔芙·白魔树屋 (Elf White Magic Treehouse)",
    "type": "精灵学者白魔法研究树屋",
    "features": "精灵之里母图 (320, 352) 接入、驻留白魔法学者 ElfWhiteScholar、出售白魔法教材 (Cure/Esuna/Curaga/Life)、返回精灵之里南门 (640, 880) 对应母图 (320, 432)",
    "monsters": "无（精灵古树室内，安全商铺与学术研究区）",
    "mechanics": "艾尔芙精灵之里西侧古树树屋。白魔法学者在此专注整理与传授大回复术、复活术与高级净化神术，全域地区名录第 94 条。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的精灵魔法树屋：Lv.13~18 安全学术商铺，为冒险者提供白魔法整备与教材研修。"
  },
  {
    "id": "dungeon-elf-black-treehouse",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "艾尔芙·黑魔树屋 (Elf Black Magic Treehouse)",
    "type": "精灵学者黑魔法研究树屋",
    "features": "精灵之里母图 (960, 352) 接入、驻留黑魔法学者 ElfBlackScholar、出售黑魔法教材 (Fire/Hail/Fira/Thundara)、返回精灵之里南门 (640, 880) 对应母图 (960, 432)",
    "monsters": "无（精灵古树室内，安全商铺与学术研究区）",
    "mechanics": "艾尔芙精灵之里东侧古树树屋。黑魔法学者在此研究中阶烈火与雷暴奥义，详析多目标威力分摊法则与属性抗性，全域地区名录第 95 条。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的精灵黑魔法树屋：Lv.13~18 安全学术商铺，提供中阶元素毁灭魔法教材。"
  },
  {
    "id": "dungeon-mysidia-white-hall",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "米西迪亚·白魔讲堂 (Mysidia White Magic Hall)",
    "type": "秘法都大导师白魔法研习讲堂",
    "features": "秘法都母图 (384, 780) 侧门接入、驻留大导师白眉 (Whitebrow)、专设共享教材 (Cure/Esuna/Curaga/Arise/Holy)、返回秘法都南门 (640, 880) 对应母图 (384, 860)",
    "monsters": "无（大魔法学术课室，安全研习区，无普通遇敌）",
    "mechanics": "米西迪亚古都大导师白眉独立学术讲堂。全域地区名录第 96 条，Lv.35~50 魔法圣殿核心课室，传授高阶单体治愈、解毒、大回复、全愈复活与神圣术教材。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的大导师白魔讲堂：安全学术课堂，规范传授白魔法极意。"
  },
  {
    "id": "dungeon-mysidia-black-corridor",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "米西迪亚·黑魔回廊 (Mysidia Black Magic Corridor)",
    "type": "秘法都大导师黑魔法研习回廊",
    "features": "秘法都母图 (864, 780) 侧门接入、驻留黑袍大魔道士 (BlackMaster)、专设共享教材 (Fire/Hail/Firaga/Blizzaga/Flare)、返回秘法都南门 (640, 880) 对应母图 (864, 860)",
    "monsters": "无（大魔法学术回廊，安全研习区，无普通遇敌）",
    "mechanics": "米西迪亚古都黑袍大魔道士独立学术回廊。全域地区名录第 97 条，Lv.35~50 魔法圣殿核心回廊，传授初级火冰与高阶大火炎、大暴雪及终极核爆禁咒教材。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的黑魔研习回廊：安全学术回廊，研讨元素爆轰与穿甲核爆法术。"
  },
  {
    "id": "dungeon-mysidia-cave-2",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "米西迪亚·秘法卷轴库 (Mysidia Scroll Library)",
    "type": "秘法古都洞阶二层安全学术卷轴库",
    "features": "秘法洞阶首层 (640, 224) 楼梯接入、沿书架与阅读桌台分布、封闭安全学术阅览区、返回首层南门 (640, 880) 对应 (640, 416)",
    "monsters": "无（神殿石阶卷轴书库，安全探索区，无普通遇敌）",
    "mechanics": "米西迪亚古都深层洞阶第二层卷轴库。全域地区名录第 98 条，Lv.35~50 魔法圣殿典籍收藏区，承接古代魔导书卷典籍安全研读。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的秘法洞阶卷轴库：安全学术空间，保存古老羊皮纸文献与星象卷轴。"
  },
  {
    "id": "dungeon-factory-mine-2",
    "category": "map",
    "tier": "织造机械城 (Factory Magitek Tier)",
    "name": "织造暗矿·矿脉岔 (Factory Mine Vein Corridor)",
    "type": "暗矿参观与矿脉采集安全长廊",
    "features": "由矿核东北阶梯 (1080, 360) 接入、T形中央步道、西矿机械引擎 (WestMiningEngine)、东矿样机架 (EastSampleRack)、东晶石矿脉 (EastCrystalVein)、南门 (640, 880) 返回矿核",
    "monsters": "无（机械工坊下层矿脉参观廊，安全探索区）",
    "mechanics": "织造机械城地下暗矿核心分支。全域地区名录第 99 条，Lv.18~28 工业矿脉观览区，T形横廊连接左右机械与晶石矿翼。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《工厂地质图鉴 (factory_visual.json)》：沿T形横廊参观左右矿翼，展示帝国动力开采引擎与珍稀晶簇矿脉。"
  },
  {
    "id": "dungeon-heliogabalus-keel",
    "category": "map",
    "tier": "西风机械帝国 (Empire Magitek Tier)",
    "name": "未完工战舰·龙骨舱 (Heliogabalus Keel)",
    "type": "帝国重型战舰安全探索舱",
    "features": "原战舰东南舱门 (1040, 720) 入口、KeelPortEngine (左舷引擎)、KeelStarboardEngine (右舷引擎)、KeelCargo (重型货箱)、回战舰南门 (1040, 640)",
    "monsters": "无（新舱安全探索，无常规遇敌）",
    "mechanics": "西风机械帝国重装战列舰下层龙骨舱。从原战舰东南舱门进入，展示帝国重工业工坊石地墙、双舷引擎与重型货箱；原舰核事件、守卫及工坊门禁保持不变。",
    "desc": "录入《全域地理志 (regions_v1.json)》与《室内地名志》的战舰局部舱室：通过局部门关联连接战舰与龙骨舱，安全无战斗，不影响主舰航行解锁状态。"
  },
  {
    "id": "dungeon-wind",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "风之神殿 (Wind Shrine)",
    "type": "初始圣域与水晶遗迹",
    "features": "原初风之水晶供奉殿堂、上升气流跳板、飞燕轻羽机关",
    "monsters": "狂风雏鹰、地穴哥布林、翼龙守卫 (Wing Raptor)",
    "desc": "立于泰肯王国北方的古老神殿，风之水晶在此发生剧烈震颤崩裂，标志着世界四大元素法则失衡的序幕。击碎后觉醒骑士、修道士、白黑青魔法师雏形。",
    "mechanics": "上升气流互动：站在风口可跃迁至上层回廊；翼龙Boss合翅状态绝对防御，展开时弱点暴露。"
  },
  {
    "id": "dungeon-torna",
    "category": "map",
    "tier": "深海与海沟层 (Abyssal Ocean Tier)",
    "name": "托尔纳水闸运河 (Torna Canal)",
    "type": "水下枢纽要塞",
    "features": "水流漩涡陷阱、闸门升降机关、席拉海龙牵引航道",
    "monsters": "水蛭魔、剧毒海星、卡尔波波斯巨妖 (Karlabos)",
    "desc": "连接内海与外海的天然运河咽喉。受风之水晶粉碎影响，水质剧烈变异，潜伏着多触手巨兽卡尔波波斯，在此经历海龙牺牲惨烈剧情。",
    "mechanics": "水流漩涡拖拽机制；卡尔波波斯触手横扫带麻痹与毒素，弱点雷电。"
  },
  {
    "id": "dungeon-walse",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "沃鲁斯水之塔 (Walse Tower)",
    "type": "螺旋水梯立体地下城",
    "features": "5层垂直螺旋水梯、高压涌泉喷溅、4层水闸开关反转水流",
    "monsters": "冰霜蜥蜴、狂暴水妖、加鲁拉水象 (Garula)",
    "desc": "耸立于洋流之上的水之圣殿。水流推动机制强制角色滑行2格；击败加鲁拉水象后水之水晶粉碎，觉醒时魔道士、骑士、狂战士水晶碎片。",
    "mechanics": "定向水流滑行；4F水闸反转水流导向；加鲁拉物理反击冲撞机制。"
  },
  {
    "id": "dungeon-karnak",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "卡尔纳克城堡与火力船 (Karnak Castle & Fire Ship)",
    "type": "限时脱出战极限地下城",
    "features": "10分钟毁灭倒计时、全开菜单战斗持续计时、15处强力宝箱怪潜伏、军曹铁爪守门截杀",
    "monsters": "变色龙、魔导士、宝箱巨蟾、军曹铁爪 (Iron Claw)",
    "desc": "火之水晶因火力船过度抽取引爆，城堡在10分钟后自爆瓦解。玩家必须在倒计时归零前搜刮丝带、火之杖等神器，并击败守门军曹完成生还。",
    "mechanics": "常驻 09:59:99 HUD 倒计时，开菜单与战斗均不暂停；终点Boss铁爪截杀。"
  },
  {
    "id": "dungeon-library",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "古代大图书馆 封印回廊 (Ancient Library)",
    "type": "魔导书架解谜地下城",
    "features": "4个书架矩阵区域、机关横移拼接书梯、青魔法等级法术研修圣地",
    "monsters": "Page 32、Page 64、Page 128、古代伊弗利特、毕普洛斯 (Byblos)",
    "desc": "沉淀数千年底蕴的古代魔导书库。按下墙面机关书架横移开启隐藏书梯；书页怪物施展等级5即死、等级4缩小；Boss毕普洛斯拥有高阶风魔与火弱点。",
    "mechanics": "书架联动位移机关；等级青魔法最佳研修场所；火焰法术对纸魔造成双倍点燃。"
  },
  {
    "id": "dungeon-ronka",
    "category": "map",
    "tier": "苍穹与宇宙层 (Sky & Space Tier)",
    "name": "朗卡浮空遗迹 (Ronka Ruins)",
    "type": "空战攻坚与高空立体要塞",
    "features": "飞空艇环绕空战、波动炮要塞主炮蓄力打断、5层传送激光浮桥、原型防卫者守卫",
    "monsters": "火箭炮台、火炎炮、海德拉、原型防卫者 (Archeoaevis)",
    "desc": "悬浮于万米高空的古代遗迹。攻坚分为飞空艇外围空战（3回合内雷击瘫痪主炮）与核心迷宫突破；击溃四形态原型防卫者觉醒游侠、忍者、风水师。",
    "mechanics": "阶段一飞空艇空战打断机制；阶段二激光浮桥传送；Boss多形态属性轮换转换。"
  },
  {
    "id": "dungeon-moore",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "穆亚大森林与长老之树 (Elder Tree & Moore Forest)",
    "type": "火海突围与自然神域",
    "features": "远古结界密林、大火焚林浓烟环境、地下避难树洞、四大守护封印之光",
    "monsters": "小树精、双头飞龙、四属性封印魔晶 (Seal Crystals)",
    "desc": "艾克斯德斯为了夺取封印纵火烧毁森林，全境陷入灼热烟雾。全员遁入莫古利地下树洞避难；击败四属性封印晶石后，加拉夫燃尽生命单挑艾克斯德斯壮烈牺牲。",
    "mechanics": "森林浓烟视野盲区与灼烧伤害；地下树洞暂避机关；加拉夫HP归0锁血继续战斗死斗机制。"
  },
  {
    "id": "dungeon-exdeath",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "艾克斯德斯要塞 (Exdeath Castle)",
    "type": "幻象破解与血肉要塞",
    "features": "双层幻象迷阵、凯鲁卡贤者舍身破幻、熔岩血池阶梯、吉尔伽美什宿敌对决",
    "monsters": "黄泉骑士、魔界花、红龙、吉尔伽美什、艾克斯德斯",
    "desc": "原看似破败城堡，经贤者舍命破解后展露由森罗树木与血肉扭曲构造的真正魔城。在此经历吉尔伽美什变身、源氏护手盗取以及宿命决战。",
    "mechanics": "幻象真假机关识别；吉尔伽美什血线偷窃源氏系列装备；艾克斯德斯死之宣告与彗星连发。"
  },
  {
    "id": "dungeon-fork",
    "category": "map",
    "tier": "地表层 (Overworld Tier)",
    "name": "双子分歧之塔 (Fork Tower)",
    "type": "双翼分队极限规则地下城",
    "features": "8人强制分为两支4人小队、左黑塔纯魔法严禁物理、右白塔纯物理严禁魔法、双塔同时击破",
    "monsters": "魔法石像、重甲铁兵、全知之神 (Omniscient)、加戈亚 (Minotaur)",
    "desc": "守护终极白魔法【神圣】与终极黑魔法【核爆】的双子塔。黑塔出刀即触发全员9999反噬；白塔施法触发反圣光即死；两塔Boss必须同时阵亡，否则虚空湮灭重置。",
    "mechanics": "绝对物理/魔法禁令规则；全知之神被物理击中全场重置重开；双Boss死亡同步验证。"
  },
  {
    "id": "dungeon-sunken",
    "category": "map",
    "tier": "深海与海沟层 (Abyssal Ocean Tier)",
    "name": "沉没沃鲁斯塔 (Sunken Walse Tower)",
    "type": "深海闭气与禅宗试炼迷宫",
    "features": "水下300米闭气420秒倒计时、深海潜水装载入、模仿师高托绝对不动试炼",
    "monsters": "海渊巨兽、深海雷电母、模仿师高托 (Gogo)",
    "desc": "滑入海底峡谷的沉没之塔。全员氧气随秒数锐减；底层模仿师高托施展绝对反击，只要玩家静默等待2分钟不动，高托即主动退让并赐予终极职业【模仿师】水晶。",
    "mechanics": "深海420秒闭气时钟；高托禅宗试炼：绝对不动（Do Nothing）机制，反击即灭队。"
  },
  {
    "id": "dungeon-trench",
    "category": "map",
    "tier": "深海与海沟层 (Abyssal Ocean Tier)",
    "name": "大海沟熔岩地宫 (Great Sea Trench)",
    "type": "海底火山口与地热迷宫",
    "features": "全域熔岩步距扣血50、矮人王国古矮人锻造所、地水火三种族石板守护兽连战",
    "monsters": "熔岩魔人、地狱巨蝎、三石板守护兽 (Phobos, Nereid, Triton)",
    "desc": "坐落于大洋底裂谷中的熔岩地下城。全域覆盖沸腾熔岩，必须依靠风水师【轻步】免伤；深处封印着古代石板，三头属性守护兽死后3回合互活，需同回合击破。",
    "mechanics": "熔岩环境伤害与灼烧减益；矮人锻造所武器重铸；三守护兽多属性复合魔法同回合全灭判定。"
  },
  {
    "id": "dungeon-fortress",
    "category": "map",
    "tier": "苍穹与宇宙层 (Sky & Space Tier)",
    "name": "天空要塞 浮游城 (Flying Fortress)",
    "type": "失落超古代科技要塞",
    "features": "5层反重力机械浮岛、激光防护网、古代机器人制造厂、苍穹风之核心",
    "monsters": "魔导装甲、浮游死亡眼、提亚马特风龙 (Tiamat)",
    "desc": "漂浮在平流层边缘的古代机械要塞。利用反重力光束在各浮岛间穿梭；要塞顶端迎战执掌烈风的四头飞龙提亚马特，封印风之以太发生器。",
    "mechanics": "反重力激光轨道跳跃；魔导防卫炮自毁充能打断；提亚马特剧毒风暴与闪电喷吐。"
  },
  {
    "id": "dungeon-lunar",
    "category": "map",
    "tier": "苍穹与宇宙层 (Sky & Space Tier)",
    "name": "月之地下溪谷 12层 (Lunar Subterrane)",
    "type": "双月核心终极试炼深渊",
    "features": "直通月球核心12层、B5F村雨、B7F诸神之黄昏、B9F圣枪、B12F塞姆斯/泽罗姆斯决战",
    "monsters": "白龙、暗黑巴哈姆特、风暴巨龙、塞姆斯、泽罗姆斯 (Zeromus)",
    "desc": "月球地底深处的纯晶体回廊，隐藏着世界最顶级的传说神兵与远古恶灵守卫。底层的泽罗姆斯拥有无尽憎恨之躯，必须以水晶之光照亮其真身方可伤及本体。",
    "mechanics": "神兵宝箱高难试炼战；泽罗姆斯大爆炸（Big Bang）蓄力警示；水晶之光真身破障机制。"
  },
  {
    "id": "dungeon-jade",
    "category": "map",
    "tier": "地狱与冥界层 (Netherworld & Hell Tier)",
    "name": "翡翠冥河通道 (Jade Passage)",
    "type": "冥界忘川死者回廊",
    "features": "生者渡河全境禁止逃跑、忘川暗流与吸魂结界每回合抽MP、怨灵瀑布",
    "monsters": "黄泉引路僧、深渊怨灵、亡者骨龙、深渊猎犬",
    "desc": "连接人界与地狱万魔殿的幽冥通道。生者踏入受到忘川结界压制，无法使用逃跑指令，且每回合流失5点MP；必须使用复活圣光超度沿途不死魔物。",
    "mechanics": "禁止逃脱限制；全域每回合MP吸收；亡灵物种死后魂火3回合复活，需圣属性净化。"
  },
  {
    "id": "dungeon-pandemonium",
    "category": "map",
    "tier": "地狱与冥界层 (Netherworld & Hell Tier)",
    "name": "万魔殿 潘地曼尼南 (Pandemonium Keep)",
    "type": "地狱魔皇王宫",
    "features": "反重力阶梯、镜面传送阵矩阵、冥界四大将镇守、地狱魔皇御座",
    "monsters": "铁巨人冥界将、红莲魔神别西卜、地狱三头犬、魔皇二阶段",
    "desc": "从地狱冥渊拔地而起的幽暗宫殿。错综复杂的镜面传送阵考验空间记忆；冥界大将携死神镰刀封锁要道；顶层宝座上迎战吸取冥界魔能的魔皇至尊。",
    "mechanics": "空间扭曲反重力倒走；镜面相位传送谜题；魔皇虚无陨石与吸血回旋踢。"
  },
  {
    "id": "dungeon-abyssal",
    "category": "map",
    "tier": "地狱与冥界层 (Netherworld & Hell Tier)",
    "name": "奈落地狱 虚无裂隙 (Abyssal Void Chamber)",
    "type": "太古死神封印神殿",
    "features": "冥皇哈迪斯三形态对决、守护血之剑与8阶终极黑魔法至高核爆、超度净化法则",
    "monsters": "死亡凝视眼、冥渊巨像、冥皇·哈迪斯 (Hades)",
    "desc": "比万魔殿更深一层的虚无死境。太古冥皇哈迪斯在此熔炼传说弑神兵器，击败其三形态可取得吸血神兵【血之剑】与毁天灭地的8阶黑魔法【至高核爆】。",
    "mechanics": "哈迪斯三形态相克属性转换；亡灵死咒每5回合点名即死；超度法则强制判定。"
  },
  {
    "id": "dungeon-rift",
    "category": "map",
    "tier": "终局虚无层 (Void & Dimensional Rift)",
    "name": "次元之隙 复合地宫 (Dimensional Rift)",
    "type": "跨时空终结回廊",
    "features": "沙漠/遗迹/幻境/瀑布/钟楼多重时空交错、隐秘封印欧米茄、神龙绝境宝箱",
    "monsters": "灾厄机兵、幻影术士、双子巨妖、机械神欧米茄 (Omega)、神龙 (Shinryu)",
    "desc": "被虚无吞噬的各时代世界残骸拼接而成的混沌迷宫。此处游荡着整款游戏最高难度的两大隐藏天花板首领：古代杀戮兵器欧米茄与守护诸神黄昏的神龙。",
    "mechanics": "多气候环境复合减益；欧米茄波动炮与反弹吸收；神龙开局大海啸灭团技对策（需穿戴珊瑚之戒）。"
  },
  {
    "id": "dungeon-voidcore",
    "category": "map",
    "tier": "终局虚无层 (Void & Dimensional Rift)",
    "name": "终焉虚无核心 (Void Core)",
    "type": "世界因果律瓦解终点",
    "features": "万物归无非之世界、全技能消耗翻倍虚无重力场、混沌言昭最终决战舞台",
    "monsters": "虚无残像、因果支配者、混沌言昭 (Neo Exdeath)",
    "desc": "宇宙法则与晶石以太彻底崩解的虚无奇点。八位主角在此汇聚光与暗的终极羁绊，迎战将自身与虚无合为一体的混沌言昭，重铸世界最初的晨曦黎明。",
    "mechanics": "虚无引力场：所有指令行动条充能延缓20%；四核同时锁定：物理、魔法、状态、灭世四大模块轮替攻击。"
  }
],
  summons: [
  {
    "id": "bahamut",
    "category": "summon",
    "name": "龙王 · 巴哈姆特 (Bahamut)",
    "rank": "最高阶天灾契约",
    "element": "无属性 / 纯粹高维以太",
    "cost": "MP 66",
    "skill_name": "亿万核爆 (Megaflare)",
    "skill_desc": "召唤天界龙王展翼降临，蓄力吐出毁灭性的高温聚合光束，对敌方全体造成无视防御与魔抗的真实爆裂冲击。",
    "trial_dungeon": "苍穹绝壁 · 龙栖岭极顶峰",
    "passive_blessing": "装备契约者全魔法攻击力提升 25%，并解锁与龙骑士的隐藏融合技【龙王破灭击】。",
    "lore": "双月星空之主，龙族真正之祖神。自太古晶石诞世起便守护星脉之平衡，唯有被龙族承认并登上苍穹绝顶之人方可与其订立契约。",
    "icon": "🐉"
  },
  {
    "id": "leviathan",
    "category": "summon",
    "name": "海王 · 利维亚桑 (Leviathan)",
    "rank": "高阶元素巨灵",
    "element": "水属性",
    "cost": "MP 39",
    "skill_name": "大海啸 (Tsunami)",
    "skill_desc": "掀起滔天海啸覆灭整个战场，对敌方全体施加强烈水属性巨创，并有 40% 概率冲散敌方当前的咏唱与蓄力状态。",
    "trial_dungeon": "深渊海沟 · 沉没伊斯特里瀑布底",
    "passive_blessing": "全队水属性伤害抗性提升 50%，在水域地宫与潮汐战场时行动条自加速 20%。",
    "lore": "统领四海所有海兽与巨鲸的霸主，性格高傲冷冽。在大海沟熔岩与激流交汇之处等待能够承受深海重压的挑战者。",
    "icon": "🌊"
  },
  {
    "id": "odin",
    "category": "summon",
    "name": "黑铁骑皇 · 奥丁 (Odin)",
    "rank": "极古战魂契约",
    "element": "时空 / 纯粹物理法则",
    "cost": "MP 48",
    "skill_name": "真·斩铁剑 (Zantetsuken)",
    "skill_desc": "骑乘八足神马斯雷普尼尔疾驰破空，一刀将敌全员两断。对非首领怪 100% 即死；对 Boss 自动转为造成 9999 破界物理暴击。",
    "trial_dungeon": "废墟要塞 · 加戈古要塞地下暗殿",
    "passive_blessing": "装备契约者普通物理攻击追加 15% 破甲几率，先制攻击发生率上升 30%。",
    "lore": "古老王国的无敌大统领，即便身死国灭其意志仍化作幽夜战神巡狩废墟。战斗开始时有 1 分钟倒计时挑战规则。",
    "icon": "🐎"
  },
  {
    "id": "phoenix",
    "category": "summon",
    "name": "幻炎之神 · 不死鸟 (Phoenix)",
    "rank": "绝境逆转圣神",
    "element": "圣光 / 火焰复合",
    "cost": "MP 50",
    "skill_name": "转生之炎 (Rebirth Flame)",
    "skill_desc": "散落重生的涅槃金羽，复活全体已阵亡队员并回复 100% 生命值，同时对敌方全体施加焚尽邪祟的神圣烈焰轰击。",
    "trial_dungeon": "通天险峰 · 菲尼克斯之塔 30F",
    "passive_blessing": "战斗中队长致死濒危时，自动获得一次【不屈庇佑】保留 1 点 HP（每场战斗限触发 1 次）。",
    "lore": "传说中栖息于三十层菲尼克斯之塔顶的浴火神鸟，其眼泪化为人鱼之泪，其尾羽拥有扭转生死因果的至高权柄。",
    "icon": "🔥"
  },
  {
    "id": "shiva",
    "category": "summon",
    "name": "冰霜女帝 · 希瓦 (Shiva)",
    "rank": "四元神幻兽",
    "element": "冰属性",
    "cost": "MP 20",
    "skill_name": "钻石星尘 (Diamond Dust)",
    "skill_desc": "优雅挥动冰晶手势，战场骤降至绝对零度，对敌方全体造成极寒冰属性魔击，并施加 3 回合冻伤减速效果。",
    "trial_dungeon": "沃鲁斯城 · 极寒冰壁瀑布后密室",
    "passive_blessing": "提升黑魔道士全系暴风雪与冰封魔法伤害 30%。",
    "lore": "掌控星球极地永冻层意志的绝美冰女，对入侵者充满警惕，但极度赏识意志坚韧如冰的纯洁战士。",
    "icon": "❄️"
  },
  {
    "id": "ifrit",
    "category": "summon",
    "name": "业火战神 · 伊芙利特 (Ifrit)",
    "rank": "四元神幻兽",
    "element": "火属性",
    "cost": "MP 22",
    "skill_name": "地狱之火 (Hellfire)",
    "skill_desc": "自滚烫熔岩地核中拔出炎魔战角，召唤漫天火流星烈焰焚场，对草木、虫类与不死系魔物造成 3 倍真实克制爆燃。",
    "trial_dungeon": "远古智识所 · 古代大图书馆古卷密室",
    "passive_blessing": "免疫常规灼烧伤害，全队火属性物理攻击附魔效果提升 40%。",
    "lore": "远古火之晶石的伴生圣兽，被封存于大图书馆的禁忌羊皮卷轴内。战胜其试炼后化为忠诚守护战神。",
    "icon": "🌋"
  },
  {
    "id": "ramuh",
    "category": "summon",
    "name": "雷霆长者 · 拉姆 (Ramuh)",
    "rank": "四元神幻兽",
    "element": "雷属性",
    "cost": "MP 25",
    "skill_name": "制裁之雷 (Judgment Bolt)",
    "skill_desc": "高举神罚权杖引落万钧天雷，电光贯穿全场，对所有机械构装体与水栖生物造成毁坏性麻痹大破甲击。",
    "trial_dungeon": "迷幻密林 · 伊斯特里森林闪电之湖",
    "passive_blessing": "全员雷抗性提升，被雷击命中时将 20% 伤害转化为自身 MP 补给。",
    "lore": "长须拂面的智者法神，手持雷霆审判大陆上心怀贪念之徒。在闪电密林深处测试勇者之本心。",
    "icon": "⚡"
  },
  {
    "id": "titan",
    "category": "summon",
    "name": "崩岩巨神 · 泰坦 (Titan)",
    "rank": "四元神幻兽",
    "element": "地属性",
    "cost": "MP 25",
    "skill_name": "大地之怒 (Earth Fury)",
    "skill_desc": "双拳猛砸地核裂缝引爆十级大地震，造成覆盖敌全员的地属性物理冲击波，对飞行单位无效但对地面敌人伤害翻倍。",
    "trial_dungeon": "陨星坑洞 · 始源陨石地下结晶窟",
    "passive_blessing": "全队物理防御力提升 15%，大幅降低受到地裂与击退位移的风险。",
    "lore": "从地底熔岩结晶中凝聚的泰坦巨灵，拥有支撑山峦的无匹神力，陨石碎裂时曾守护地脉稳定。",
    "icon": "⛰️"
  },
  {
    "id": "carbuncle",
    "category": "summon",
    "name": "灵光玉兽 · 卡邦库尔 (Carbuncle)",
    "rank": "奇迹辅助幻兽",
    "element": "圣光 / 防御屏障",
    "cost": "MP 18",
    "skill_name": "红宝石之光 (Ruby Light)",
    "skill_desc": "额间红宝石迸发出璀璨辉光，为我方全体角色常驻赋予【魔法反射壁 (Reflect)】，自动反弹敌方法术回击。",
    "trial_dungeon": "恶魔城堡 · 埃克斯迪斯古堡内层密阁",
    "passive_blessing": "受到的法术异常状态持续时间缩短 50%，全队魔法防御基础值上升 25 点。",
    "lore": "娇小可爱却拥有逆转乾坤神能的晶石灵兽，在城堡深处为勇者提供坚不可摧的法术抗衡屏障。",
    "icon": "💎"
  },
  {
    "id": "syldra",
    "category": "summon",
    "name": "狂澜海龙 · 西尔多拉 (Syldra)",
    "rank": "高阶守护神龙",
    "element": "风与水双属性",
    "cost": "MP 32",
    "skill_name": "风暴苍穹击 (Dragon Gale)",
    "skill_desc": "海龙残魂在羁绊呼唤中显圣，呼啸卷起风水复合超级龙卷风，强力撕裂敌方后排阵线。",
    "trial_dungeon": "海盗秘穴 · 法里斯故居安息石碑",
    "passive_blessing": "风属性与水属性法术 MP 消耗降低 20%，航海与飞空艇巡航遇敌率可自主调控。",
    "lore": "海盗船长法里斯幼年相伴的忠诚海龙，在海妖战中舍命救主沉入海底，其灵魂化为不灭守护幻兽。",
    "icon": "🌪️"
  },
  {
    "id": "golem",
    "category": "summon",
    "name": "巨岩守护尊 · 魔像 (Golem)",
    "rank": "战术护盾幻兽",
    "element": "坚壁岩石",
    "cost": "MP 18",
    "skill_name": "岩盾金钟罩 (Earth Ward)",
    "skill_desc": "显化为全场最坚固的巨石坚盾，代替全队同伴吸收累计总计 3500 点的物理伤害，抵挡期间全员免受普攻硬直。",
    "trial_dungeon": "巨人之谷 · 飞龙草山道营救战役",
    "passive_blessing": "前排战士职业物理格挡率上升 15%，嘲讽技能敌方索敌率增加 30%。",
    "lore": "诞生于巨人之谷的古代石魔守卫，被凶暴骨龙围攻时被主角队伍救下，自此发誓成为同伴身前最坚毅的盾牌。",
    "icon": "🗿"
  },
  {
    "id": "chocobo",
    "category": "summon",
    "name": "飞羽吉祥物 · 胖陆行鸟 (Fat Chocobo)",
    "rank": "欢乐奇迹契约",
    "element": "物理搞笑 / 强运",
    "cost": "MP 5",
    "skill_name": "陆行鸟泰山压顶 (Chocobo Drop)",
    "skill_desc": "召唤超巨大胖陆行鸟从万米高空呼啸砸下，造成大范围搞笑物理压杀，并有 35% 几率令敌全体陷入滑稽眩晕。",
    "trial_dungeon": "幻影密林 · 陆行鸟森林隐藏隐居所",
    "passive_blessing": "战斗结算金币掉落加成 +25%，逃跑成功率提升至 100%。",
    "lore": "大陆所有陆行鸟的最高领袖，体态丰腴嗜好野菜，拥有从天而降的无厘头搞笑威力与极大储物空间。",
    "icon": "🐤"
  }
],
  items: [
  {
    "id": "it-01",
    "name": "恢复药 (Potion)",
    "category": "heal",
    "type": "基础战备",
    "price": "50 G",
    "effect": "恢复单体同伴 50 点 HP，原野与战斗全期均可使用。",
    "desc": "以野外药草提炼的普及型疗伤药剂，冒险者背囊中的必备品。"
  },
  {
    "id": "it-02",
    "name": "高级恢复药 (Hi-Potion)",
    "category": "heal",
    "type": "高阶战备",
    "price": "150 G",
    "effect": "恢复单体同伴 150 点 HP，有效应对中期精英怪高烈度斩击。",
    "desc": "蒸馏浓缩的深绿药剂，能够瞬时愈合较深的外伤与骨裂。"
  },
  {
    "id": "it-03",
    "name": "特级恢复药 (X-Potion)",
    "category": "heal",
    "type": "极品战备",
    "price": "1500 G",
    "effect": "恢复单体目标 100% 全部 HP（瞬间满血），高难 Boss 战救场神器。",
    "desc": "秘法都炼金术士手工熬制的顶级秘药，生命恢复力无可比拟。"
  },
  {
    "id": "it-04",
    "name": "以太药 (Ether)",
    "category": "mp",
    "type": "法力补给",
    "price": "500 G",
    "effect": "恢复单体同伴 50 点 MP，维持法系职业法术输出续航。",
    "desc": "封存着活性以太原液的水晶小瓶，散发着微弱的淡蓝色辉光。"
  },
  {
    "id": "it-05",
    "name": "特级以太药 (Dry Ether)",
    "category": "mp",
    "type": "极品法力",
    "price": "3000 G",
    "effect": "恢复单体同伴全部 MP（直接补满），药师高阶调合关键素材。",
    "desc": "极度纯净的凝固态以太结晶，能在瞬间让枯竭的精神识海重归充盈。"
  },
  {
    "id": "it-06",
    "name": "圣灵药 (Elixir)",
    "category": "elixir",
    "type": "奇迹双全",
    "price": "非卖品 (稀有掉落)",
    "effect": "瞬间同时恢复单体同伴 100% 全部 HP 与 100% 全部 MP。",
    "desc": "太古炼金术所能达到的最高杰作，传说具有返老还童与重塑躯体的神能。"
  },
  {
    "id": "it-07",
    "name": "终极圣灵药 (Megalixir)",
    "category": "elixir",
    "type": "终极全团神药",
    "price": "非卖品 (深渊极品)",
    "effect": "瞬间恢复我方【全体队员】100% 全部 HP 与 100% 全部 MP。",
    "desc": "全世界仅存数枚的黄金圣水，在全员团灭濒危时可瞬间完成全队完全重组。"
  },
  {
    "id": "it-08",
    "name": "不死鸟之尾 (Phoenix Down)",
    "category": "revive",
    "type": "起死回生",
    "price": "300 G",
    "effect": "复活一名已战斗阵亡的同伴，并回复少量 HP。",
    "desc": "摘自幻兽不死鸟尾翼的真金羽毛，燃烧时可将逝去者的灵魂自黄泉召回。"
  },
  {
    "id": "it-09",
    "name": "万灵解药 (Remedy)",
    "category": "cleanse",
    "type": "全状态驱散",
    "price": "250 G",
    "effect": "一次性解除单体同伴身上除石化与即死外的【全部异常状态】（中毒、盲目、沉默、混乱、睡眠等）。",
    "desc": "由十二种古森林奇异清心草混合提炼的复合药剂，入口清苦瞬时驱除瘴气。"
  },
  {
    "id": "it-10",
    "name": "金针 (Gold Needle)",
    "category": "cleanse",
    "type": "破石化专用",
    "price": "100 G",
    "effect": "精准解除角色的石化 (Petrify) 状态，防止石化碎裂致死。",
    "desc": "以导魔秘金精制而成的细长银针，刺入穴位可融化石化魔咒。"
  },
  {
    "id": "it-11",
    "name": "英雄之药 (Hero Drink)",
    "category": "buff",
    "type": "战力突破",
    "price": "5000 G",
    "effect": "本场战斗中单体同伴攻击力、防御力、魔力与敏捷全面临时暴涨 30%。",
    "desc": "狂战士与古代勇者出征前痛饮的烈性激能灵酒，能激发人体深层潜能。"
  },
  {
    "id": "it-12",
    "name": "风魔手里剑 (Fuma Shuriken)",
    "category": "tactical",
    "type": "忍者投掷武器",
    "price": "2000 G",
    "effect": "忍者【投掷 (Throw)】指令专属，对目标造成无视防御的 3000+ 物理毁灭打击。",
    "desc": "四枚极度锋利的淬毒精钢十字飞刃，投掷旋转时伴随刺耳的破空风啸。"
  },
  {
    "id": "it-20",
    "name": "圣水 (Holy Water)",
    "category": "tactical",
    "type": "神圣净化",
    "price": "150 G",
    "effect": "对不死系 (Undead) 敌人造成 100 点圣属性直接破除伤害；其他非不死生物目标无效。",
    "desc": "晨辉王宫由大祭司祝福的圣泉纯水，是克制幽灵、僵尸与不死妖骸的特效圣物。"
  },
  {
    "id": "it-21",
    "name": "野营小屋 (Cottage)",
    "category": "camp",
    "type": "野外休整",
    "price": "600 G",
    "effect": "在野外大地图或存档点搭建全功能庇护木屋，全队生命值 HP、魔法值 MP 完整回满，且解除战斗不能状态。",
    "desc": "王宫御膳房配发的模块化行军营地木屋套件，提供远征冒险中最坚实的后勤庇护。"
  },
  {
    "id": "104",
    "name": "飞龙之笛 (Dragon Flute)",
    "category": "key",
    "type": "剧情遗物",
    "price": "非卖品",
    "effect": "苍岚托付的刻有龙纹的短笛。吹响可呼唤天空飞龙伴行，并作为治愈幼龙翅膀毒伤的永恒见证。",
    "desc": "幼龙曾因翅膀上的毒伤而低垂着头。伤口得到照料后，它重新抬起头；苍岚将刻有龙纹的短笛交出，留下这次救治的纪念。"
  },
  {
    "id": "105",
    "name": "精灵女王的叶纹信物 (Elf Queen's Leaf Emblem)",
    "category": "key",
    "type": "剧情遗物",
    "price": "非卖品",
    "effect": "失明弓手保管的精灵女王信物。作为穿行迷雾森林的通行凭据，向哨兵证明善意来意。",
    "desc": "保管信物的枯枝是一位失明弓手，能听辨叶子的方向。迷雾林的哨兵警惕人类，女王留下的徽记则是说明来意的凭据。"
  },
  {
    "id": "106",
    "name": "人鱼鳞片信物 (Mermaid Scale Token)",
    "category": "key",
    "type": "剧情遗物",
    "price": "非卖品",
    "effect": "人鱼艾莉娜所托付的银蓝鳞片信物。作为海洋与陆地羁绊的证明，替其走向岸上的流歌以回应琴声。",
    "desc": "艾莉娜无法离开海洋；一旦离海，她便会干涸成石。她让银蓝鳞片替自己走向岸上的流歌，回应那段仍未停下的琴声。"
  },
  {
    "id": "108",
    "name": "双月结界手稿 (Twin Moon Barrier Manuscript)",
    "category": "key",
    "type": "剧情遗物",
    "price": "非卖品",
    "effect": "秘法都观测者记录的双月轨道与结界图稿。用于辨识哪些封印晶石正在承受虚无撕裂压力。",
    "desc": "秘法都的观测者将双月轨道的偏角与古书中的结界图相互对照。昼隐抄录这些图稿，用来辨认哪些晶石正承受压力；文字本身并不能替人战斗。"
  },
  {
    "id": "109",
    "name": "八裂口分布图 (Eight Rifts Chart)",
    "category": "key",
    "type": "剧情遗物",
    "price": "非卖品",
    "effect": "学者瓦达所绘制的八道深渊裂口图谱。记载着各裂口暗流脉冲的起落规律与衰减周期。",
    "desc": "瓦达在图上记录了朝向不同方向的八道裂口。方向虽异，暗流却沿同一周期起落；西侧研究帐篷关注的，正是这些暗流的衰减周期。"
  },
  {
    "id": "110",
    "name": "皇宫内廷钥匙卡 (Imperial Palace Inner Keycard)",
    "category": "key",
    "type": "剧情遗物",
    "price": "非卖品",
    "effect": "帝国皇宫内廷与御座后门的最高权限钥匙卡。通行神将军把守的内廷禁区。",
    "desc": "交出钥匙卡时，近卫说他已很久没有见到皇帝亲自走出御座后的门。当时，神将军仍把守着御座。"
  },
  {
    "id": "112",
    "name": "水晶眼 (Crystal Eye)",
    "category": "key",
    "type": "剧情遗物",
    "price": "非卖品",
    "effect": "玛托雅观察周围的凭依。这枚从阿斯托斯处取回的晶体，承载着她看清世界的视线，能助其配制出破除长眠的苏醒药。",
    "desc": "水晶眼是玛托雅观察周围的凭依。失去它时，她只能在洞穴中摸索寻找。这枚从阿斯托斯处取回的晶体，承载着她看清世界的视线。"
  },
  {
    "id": "114",
    "name": "神秘钥匙 (Mystic Key)",
    "category": "key",
    "type": "剧情遗物",
    "price": "非卖品",
    "effect": "精灵王子受到阿斯托斯诅咒长眠，苏醒后将钥匙托付给来访者；能够开启世界各地被神秘力量封锁的宝物库门扉。",
    "desc": "精灵王子受到阿斯托斯的诅咒而长眠。苏醒药解除诅咒后，他将神秘钥匙托付给来访者；这把钥匙能够开启被神秘力量封锁的门。"
  }
],
  armors: [
  {
    "id": "ar-01",
    "name": "源氏之护手 (Genji Glove)",
    "category": "relic",
    "type": "传说饰品 (ID: 2112)",
    "job": "全职业通用 (战士系极意)",
    "stats": "物理防御 +12, 魔法防御 +5",
    "effect": "装备此护手后，可激活副手武器 (二刀流 Dual-Wield)，使任何符合条件的同伴均能双持武器普攻！",
    "origin": "大桥第三战 偷盗吉尔伽美什获取 / 遗迹深层宝匣",
    "rarity": "★★★★★ 破格神级饰品"
  },
  {
    "id": "ar-ribbon",
    "name": "丝带 (Ribbon)",
    "category": "relic",
    "type": "传说头部防具 (ID: 2111)",
    "job": "女性角色专属 / 素手自由人通用",
    "stats": "物理防御 +12, 魔法防御 +12",
    "effect": "佩戴于头部，提供高达 +12 双防，并免疫几乎全系负面异常状态（猛毒、盲目、沉默、石化、混乱、青蛙等）。",
    "origin": "卡尔纳克城堡宝箱 / 终极地下城隐秘密室",
    "rarity": "★★★★★ 终极全免异常头饰"
  },
  {
    "id": "ar-02",
    "name": "赫尔墨斯之靴 (Hermes Sandals)",
    "category": "relic",
    "type": "传说饰品",
    "job": "全职业通用",
    "stats": "敏捷 +20, 闪避率 +25%",
    "effect": "战斗全场常驻赋予【急速状态 (Haste)】，行动条充能速度翻倍，且完全免疫减速与缓慢Debuff。",
    "origin": "幻影之村黑市秘密通道宝箱",
    "rarity": "★★★★★ 行动轴核心神器"
  },
  {
    "id": "ar-03",
    "name": "源氏之盔 (Genji Helm)",
    "category": "armor",
    "type": "重型头盔",
    "job": "圣骑士 / 暗黑骑士 / 自由人",
    "stats": "物理防御 +35, 魔法防御 +20",
    "effect": "东方武圣传承重铠头盔，免疫盲目、失神与混乱状态，极大增强物理暴击抗性。",
    "origin": "海战偷盗吉尔伽美什掉落",
    "rarity": "★★★★ 传世武具"
  },
  {
    "id": "ar-04",
    "name": "源氏之铠 (Genji Armor)",
    "category": "armor",
    "type": "全身重铠",
    "job": "圣骑士 / 战士",
    "stats": "物理防御 +85, 魔法防御 +45, 力量 +15",
    "effect": "全大陆物理减伤最高重铠，受物理攻击时有 25% 几率反弹 50% 真实近战反伤。",
    "origin": "库扎封印城深层密室宝箱",
    "rarity": "★★★★★ 传世重防"
  },
  {
    "id": "ar-05",
    "name": "防具奇迹 · 缎带 (Ribbon)",
    "category": "armor",
    "type": "头部头饰",
    "job": "全职业全角色通用",
    "stats": "魔法防御 +50, 精神 +18",
    "effect": "【全异常状态永久绝对免疫】！包括即死、石化、青蛙、中毒、沉默、盲目、睡眠、混乱与魅惑！",
    "origin": "四极遗迹金字塔最顶端限定唯一宝箱",
    "rarity": "★★★★★ JRPG 传世之至宝"
  },
  {
    "id": "ar-06",
    "name": "晨辉誓约剑 (Dawn Pledge)",
    "category": "hero_relic",
    "type": "单手圣剑 (黎川专属)",
    "job": "光之战士 · 黎川",
    "stats": "攻击力 +185, 速度 +12, 圣属性",
    "effect": "黎川专属神装。天翔闪光斩怒气充能速度提升 100%，连击时必附带 30% 晨曦破甲削弱。",
    "origin": "黎川完成古王圣陵考验时由导师卫珩亲手授受",
    "rarity": "★★★★★ 主角专属英雄神兵"
  },
  {
    "id": "ar-07",
    "name": "烬灭死誓大剑 (Ash Executioner)",
    "category": "hero_relic",
    "type": "双手重剑 (纳哈特专属)",
    "job": "暗之战士 · 纳哈特",
    "stats": "攻击力 +192, 力量 +25, 暗属性",
    "effect": "纳哈特专属神装。暗月断魂斩生命消耗降低 50%，生命值越低攻击力越高（最高增幅 200%）。",
    "origin": "烬堡废墟战胜父亲亡灵战魂后解封",
    "rarity": "★★★★★ 主角专属英雄神兵"
  },
  {
    "id": "ar-08",
    "name": "幽夜满月狂澜扇 (Crescent War Fan)",
    "category": "hero_relic",
    "type": "战斗战扇 (澄月专属)",
    "job": "暗之战士 · 澄月",
    "stats": "攻击力 +155, 敏捷 +22, 暴击率 +35%",
    "effect": "澄月专属神装。剑舞触发率提升至 70%，且全场舞蹈技能无法被打断或反制。",
    "origin": "沙月城地下斗技场连续 10 连胜斩获",
    "rarity": "★★★★★ 主角专属英雄神兵"
  },
  {
    "id": "ar-09",
    "name": "非之深渊黑魔导球 (Orb of the Void)",
    "category": "hero_relic",
    "type": "法术核心 (夜织专属)",
    "job": "暗之战士 · 夜织",
    "stats": "魔力 +45, 魔法暴击率 +30%",
    "effect": "夜织专属神装。连续魔施放任何黑魔法均不衰减伤害，且 15% 概率触发无消耗次元震荡。",
    "origin": "非之世界祭坛由哥哥昼隐联手提取虚无结晶锻造",
    "rarity": "★★★★★ 主角专属英雄神兵"
  }
]
,
  vehicles: [
  {
    "id": "veh-feet",
    "category": "vehicle",
    "name": "双腿徒步探索 (Feet Walking)",
    "type": "基础陆行方式",
    "speed": "1.0x 基础步速",
    "capability": "平原、森林、荒原、洞窟全域通行，受地形减益（毒沼/熔岩扣血）",
    "desc": "旅行者最原始的丈量世界方式，支持跑步与静止交互。在危险野外行走将按步距随机触发暗怪遭遇战。",
    "lore": "光与暗的年轻英雄们踏出王都与故土的第一步。"
  },
  {
    "id": "veh-ychocobo",
    "category": "vehicle",
    "name": "黄色平原陆行鸟 (Yellow Chocobo)",
    "type": "陆上高速坐骑",
    "speed": "2.0x 疾驰极速",
    "capability": "【特权】骑乘期间绝对不触发任何野外遇敌战斗；受河流与山脉阻隔",
    "desc": "分布于世界各地陆行鸟森林的温驯大鸟。骑乘时全速狂奔，彻底免除一切杂兵干扰。下鸟后会自动飞奔回出生森林。",
    "lore": "JRPG 永恒的吉祥物与陆地行者，旅途绝佳伙伴。"
  },
  {
    "id": "veh-wchocobo",
    "category": "vehicle",
    "name": "白色圣光陆行鸟 (White Chocobo)",
    "type": "森林守护神兽",
    "speed": "不可骑乘 (圣域驻留)",
    "capability": "【特权】与之对话施展圣光洗礼，瞬间补满全队所有队员的 MP",
    "desc": "罕见洁白的圣灵陆行鸟，常驻于陆行鸟隐秘圣林。在经历高难迷宫脱出或法力匮乏时，是野外零花费的最强魔法续航基站。",
    "lore": "据传沐浴过始源水晶光辉的陆行鸟，拥有抚平精神创伤的奇迹光环。"
  },
  {
    "id": "veh-bchocobo",
    "category": "vehicle",
    "name": "黑色飞行陆行鸟 (Black Chocobo)",
    "type": "低空飞行异种",
    "speed": "2.5x 翱翔速度",
    "capability": "越过险峻山脉与广袤密林；【着陆限制】仅可降落在墨绿色密林中",
    "desc": "双翼生风的罕见黑羽陆行鸟。能够振翅飞越步兵无法攀越的高耸山岭与峡谷裂缝，但由于习性特殊，只能在森林冠层着陆。",
    "lore": "诞生于隐秘群山深处的飞翔遗民，是突破初期大陆阻隔的重要钥匙。"
  },
  {
    "id": "veh-fchocobo",
    "category": "vehicle",
    "name": "胖陆行鸟 (Fat Chocobo)",
    "type": "空间收纳神兽",
    "speed": "定点召唤 (空间折叠)",
    "capability": "【特权】提供 256 格永久独立物品仓库管理，彻底解放背包负担",
    "desc": "在陆行鸟森林带有草木香气的草丛前使用【基萨尔野菜】，它便会憨态可掬地自地下钻出，吞吐保管玩家所有的珍稀战备与收集品。",
    "lore": "体内蕴含小型次元口袋的奇幻大鸟，对美味野菜毫无抵抗力。"
  },
  {
    "id": "veh-ship",
    "category": "vehicle",
    "name": "龙首跨海帆船 (Dragonhead Ship)",
    "type": "近海破浪战舰",
    "speed": "1.8x 航海极速",
    "capability": "内海与沿岸航行，浅滩自由停靠；由海龙西尔多拉羁绊牵引",
    "desc": "海盗头领法丽斯的座驾。由通人性的海龙西尔多拉破浪牵引，即便在无风带也能如离弦之箭破浪前行，连接各大沿海城邦。",
    "lore": "承载着海盗深厚羁绊的旗舰，其龙首雕像凝视着无垠海平线。"
  },
  {
    "id": "veh-fireship",
    "category": "vehicle",
    "name": "蒸汽火力船 (Fire Ship)",
    "type": "魔导蒸汽动力船",
    "speed": "2.2x 巡航速度",
    "capability": "无视洋流横渡深海外海；配备完备轮机舱，内部设休息室",
    "desc": "卡尔纳克工程师西德汲取火之水晶能量研发的魔导蒸汽铁甲船。无需风力与水兽牵引，动力澎湃，可跨越狂暴大洋。",
    "lore": "象征着凡人尝试驾驭水晶以太科技的工业杰作，亦揭开了水晶过载的危机。"
  },
  {
    "id": "veh-submarine",
    "category": "vehicle",
    "name": "深海远古潜水艇 (Submersible)",
    "type": "深渊潜航载具",
    "speed": "1.5x 水下航速",
    "capability": "潜入水下 300 米深海海沟，探索海底洞窟、沉没沃鲁斯塔与沉船秘宝",
    "desc": "在火力船下方加装高强度抗压合金舱室后诞生的深海潜航器。潜入碧蓝深渊，解锁海面以下庞大而神秘的水下世界网络。",
    "lore": "探寻沉眠于深海之底失落文明与古代石板的唯一途径。"
  },
  {
    "id": "veh-airship",
    "category": "vehicle",
    "name": "魔导飞空艇 (Magitek Airship)",
    "type": "全地形机动空中母舰",
    "speed": "3.5x 高空巡航",
    "capability": "无视一切地形阻隔（山川/海洋/毒沼全通）；平原降落；内设生活移动基地",
    "desc": "西德与米德祖孙合力打造的传奇飞行器。机舱内配备床铺宿屋、装备与道具商贩、保存晶石，是终盘拯救世界的自由指挥所。",
    "lore": "自由与冒险的永恒图腾，展翼穿梭于第一世界与第二世界的广袤苍穹。"
  },
  {
    "id": "veh-lunar-airship",
    "category": "vehicle",
    "name": "双月星际改造飞空艇 (Lunar Airship)",
    "type": "次元穿梭星舰",
    "speed": "瞬发星际跃迁",
    "capability": "突破世界大气层与虚无屏障，航向青之月与红之月，降落月球环形山",
    "desc": "终盘阶段搭载反引力魔导引擎与次元共振仪的改型飞空艇。能够摆脱地表重力束缚，直接驶向双月核心与次元之隙终局战役。",
    "lore": "凡人以凡躯与机械触碰神明领域、斩断万年因果轮回的终极飞翔羽翼。"
  }
]
,
  sidequests: [
  {
    "id": "runtime-sq-01",
    "category": "sidequest",
    "title": "SQ-01 失落的家传项链",
    "region": "晨辉城门 · 阿梅 / 晨辉郊外右侧树林",
    "type": "正式支线",
    "trigger": "完成序章末节拍 ch00_arrive_temple 后向阿梅接取；击败本委托的专属野狼，拾回铜项链再返还。普通野狼胜利不能代替。",
    "reward": "力量护腕（饰品，物理攻击 +3）×1、150G；护腕不自动装备。",
    "desc": "已接通原居民、专属明怪、正式胜利结算、拾回、一次交付、任务日志与存档来源校验。",
    "status": "正式接通 · 隔离验证",
    "validation": "已做隔离事务、地图节点、装备投影与私保存恢复检查；尚不代表自然战斗、完整逃跑或真人游玩与视觉验收。"
  },
  {
    "id": "runtime-sq-02",
    "aliases": ["神殿残卷"],
    "category": "sidequest",
    "title": "SQ-02 神殿的残卷",
    "region": "始源神殿 · 守石侍童甲 / 西、东石柱与中央石路",
    "type": "正式支线",
    "trigger": "完成第一章末节拍 ch01_basic_jobs 后向守石侍童甲接取；三处调查标签各收集一页，三页齐全后返还。保留原机关，不新增伤害陷阱。",
    "reward": "提前解锁共享白魔法教材「中回复 Cura」；需符合原职业资格，MP 9，治疗基底 21，实际效果沿原治疗公式。",
    "desc": "已接通原NPC、三页采集、一次交付、共享学习、任务日志及存档来源校验。普通新局撤销Cura；新周目可继承教材，不算本轮任务完成。",
    "status": "正式接通 · 隔离验证",
    "validation": "已做隔离域、私文件与新局/周目检查，另有原魔法菜单和战斗目标选择界面集成证据；不代表自然取得、自然战斗或真人视觉验收。"
  },
  {
    "id": "runtime-sq-03",
    "aliases": ["飞龙草药"],
    "category": "sidequest",
    "title": "SQ-03 飞龙的草药",
    "region": "龙栖岭 · 飞龙巢幼龙 / 北端山道",
    "type": "正式支线",
    "trigger": "完成苍岚会面节拍 ch02_meet_canglan，并先完成幼龙原有毒伤救治，再向同一幼龙接取旧伤委托；采一株龙涎草后返巢交付。",
    "reward": "飞龙皮靴（饰品）×1；当前队伍任一成员装备时，大地图步行和奔跑速度 +20%，多双不叠加。船、飞空艇、黑陆行鸟及地点内移动不变。",
    "desc": "已接通接取、单株采集、一次交付、任务日志与存档来源校验。原毒伤救治及飞龙之笛奖励保留，不能代替本支线完成；新周目继承皮靴，清理临时草药。",
    "status": "正式接通 · 隔离验证",
    "validation": "已做隔离原流程、私保存与周目检查；另验原世界角色连续帧移动及指定上下交通入口。保留退出资源提示，不代表自然游玩或真人视觉验收。"
  },
  {
    "id": "runtime-sq-04",
    "category": "sidequest",
    "title": "SQ-04 迷雾深处的笛音",
    "region": "迷雾林 · 难民阿肯 / 世界树根须南侧",
    "type": "正式支线",
    "trigger": "完成 ch03_shipwreck 后向阿肯接取（原稿第5章对应现 ch03_ranger）；仍须满足原叶纹信物通行规则。循笛声叙述找到精灵少年，解救后返阿肯交付。",
    "reward": "精灵胸针（饰品）×1；装备后混乱免疫，无额外属性。",
    "desc": "已接通原难民、临时少年现场、一次交付、任务日志与严格存档来源校验。救出后少年不入队；新周目可继承胸针，不补本轮任务完成。",
    "status": "正式接通 · 隔离验证",
    "validation": "正式源114项隔离检查通过；强制结束/重开组保留既有对白插件退出资源提示。免疫已验装备投影和角色异常免疫模块；完整敌方施加→抵抗/图标及冷启动读槽UI另验，不代表自然游玩或真人视觉验收。"
  },
  {
    "id": "runtime-sq-05",
    "category": "sidequest",
    "title": "SQ-05 海怪清剿令",
    "region": "海角镇 · 海盗首领博卡 / 海角湾水域 (2112, 1456)",
    "type": "正式支线",
    "trigger": "完成 ch04_sea_route 并取得帆船后向博卡接取；乘船前往海角湾指定水域调查专属狂暴寄居蟹，战胜后返回博卡交付。",
    "reward": "远洋硬木（重要物品 163）×1、800G；持有时帆船普通巡航达到原冲刺速度，冲刺速度不变。",
    "desc": "返博卡交付一次奖励；持有硬木仅提升帆船普通巡航，不影响步行或其他载具。新周目继承硬木，仍须重新开放航路取得帆船，旧物不代替本轮接取或领奖。",
    "status": "正式接通 · 隔离验证",
    "validation": "已完成模块接线、严格三bool流转与航速逻辑单点验证；不代表自然战斗、真实海怪Boss或真人视觉验收。"
  },
  {
    "id": "runtime-sq-06",
    "category": "sidequest",
    "title": "SQ-06 烬堡的遗物箱",
    "region": "烬堡废墟 · 年老斥候 / 地窖东侧独立军械遗物箱",
    "type": "正式支线",
    "trigger": "完成 ch05_ash_keep 后先听年老斥候原线索开放地窖，再次交谈接取独立委托；在地窖东侧解除独立锁箱，取得将士名册后返回交付。原主线遗物、钥匙旗不能代替。",
    "reward": "烬卫之剑（武器·剑）×1；攻击38、火属性。与原主线攻击30的烬卫遗剑是不同装备。",
    "desc": "已接通原居民、独立锁箱、名册实物与本轮来源校验、一次交付、任务日志及严格保存。新周目清名册与任务旗，沿原规则继承剑，仍需重新接取和交付。",
    "status": "正式接通 · 隔离验证",
    "validation": "正式接线60项隔离检查通过，涵盖原对白、寻路行走、私保存与新进程冷读、周目及火属性消费者；另有原攻击菜单消费者证据。不代表自然进图、自然取得或自然战斗、真人视觉验收。"
  },
  {
    "id": "runtime-sq-07",
    "category": "sidequest",
    "title": "SQ-07 丢失的发条",
    "region": "织造城实验厅 · 独立齿轮小匠 / 战舰五处报废零件",
    "type": "正式支线",
    "trigger": "完成 ch06_factory_city 后向实验厅独立齿轮小匠接取；进入战舰仍须完成原 ch06_memory_girl 门禁。五处独立调查点各取一颗精密发条，五处本轮来源与五颗实物齐全后返回交付；不改变原齿轮商店。",
    "reward": "机械核心×1；普通搭话打开默认暂时离开的可取消选择窗，确认才以一颗核心换现有护盾指环（饰品）×1，沿原防御8与开局 Protect。",
    "desc": "已接通独立小匠、五处发条采集、一次交付、原生兑换选择、日志与严格保存。新周目清临时发条；未兑换核心及指环按原规则继承。兑换不要求本轮完成旗，也不补造任务完成。",
    "status": "正式接通 · 隔离验证",
    "validation": "正式同源155项隔离检查通过，涵盖原地图身体行走、自然结束对白、原生选择窗、私保存与新进程冷读、周目及日志。生命周期保留音频资源退出提示；不代表自然跨图通关、完整读档/周目页UI或真人视觉验收。"
  },
  {
    "id": "runtime-sq-08",
    "category": "sidequest",
    "title": "SQ-08 绿洲甘泉",
    "region": "沙月都市 · 贫民区孩童与水井 / 集市井南侧引水口",
    "type": "正式支线",
    "trigger": "原稿第16章映射 ch07_sand_moon；进入贫民区仍须满足原 ch07_stage_leader 与伴舞暗道线索。向孩童接取，沿沙地街路到集市井南侧疏通引水口，贫民井复水后返回孩童交付。",
    "reward": "舞者发带（头部 head）×1，仅物理回避 +5%；另获1200G。沿普通头部装备许可，不增加防御、速度或其它属性。",
    "desc": "已接通孩童、双井供水、一次完整奖励、任务日志及三项严格保存来源。无临时水物；新周目清任务旗并沿原规则继承发带。原稿流沙陷阱未实现，当前为已选双井供水适配。",
    "status": "正式接通 · 隔离验证",
    "validation": "正式接线91项隔离检查通过，涵盖原导航行走与自然结束对白、私保存与新进程冷读、周目；另有原装备页和战斗场景5%字段投影证据。未做物理闪避概率实测，不代表自然跨图游玩、自然战斗或真人视觉验收。"
  },
  {
    "id": "runtime-sq-09",
    "category": "sidequest",
    "title": "SQ-09 老骑士的佩剑",
    "region": "旧王国王陵 · 原守墓人 / 下宫专属黑铁骷髅与中央石棺南侧灵位",
    "type": "正式支线",
    "trigger": "完成 ch08_qianluo_lineage 且已由原守墓人开放皇家藏室后，再次交谈接取并获得前团长的断剑。击破本委托专属黑铁骷髅，将断剑放于下宫中央石棺南侧灵位，再返守墓人交付；普通同种击杀不能代替。",
    "reward": "圣殿骑士盾（盾 shield）×1，防御 +18、额外近战物理格挡（闪避）+10%。仅适用于明确标记为近战的物理动作；远程、未知物理和魔法不适用，不是全部物理闪避，也不是骑士精通的每敌行动一次持盾格挡。",
    "desc": "已接通原守墓人、独立显式遭遇、断剑实物放置、一次交付、任务日志与四项严格保存来源。新周目清临时断剑及任务旗，盾按原装备规则继承，不补本轮完成；沿普通盾装备许可。",
    "status": "正式接通 · 隔离验证",
    "validation": "正式接线90项隔离检查通过，涵盖原地图、私保存与新进程冷读、周目、盾投影、旧通知撤权及真实进战入口元数据；另有原装备页与战斗场景字段投影证据。击破验证使用明确合成来源收据，未验证真实胜利、完整或自然战斗、格挡概率或真人视觉。"
  },
  {
    "id": "runtime-sq-ff1-crown-chain",
    "aliases": ["王冠之托", "神秘钥匙", "ff1_crown_chain"],
    "category": "sidequest",
    "title": "史诗支线 · 西方王城王冠之托与神秘钥匙",
    "region": "西方王城 (ff1_western_keep) · 国王 (640, 304) / 沼泽洞窟 / 矮人洞窟 / 精灵城堡",
    "type": "正式支线",
    "trigger": "与西方王城国王交谈开启委托（accept=ff1_crown_accepted）；深入沼泽洞窟地下一层夺回失落王冠（111）；将水晶之眼（112）归还玛托雅女巫换取苏醒药（113）；由巫医唤醒沉睡的精灵王子，终获神秘钥匙（114，complete=ff1_mystic_key）。",
    "reward": "神秘钥匙（Key Item）×1，解锁世界全境受封印皇家藏宝库通行权；全套王室谢礼。",
    "desc": "横跨八张经典地图的四阶经典物品交换链条：111 王冠 ➔ 112 水晶眼 ➔ 113 苏醒药 ➔ 114 神秘钥匙。全面接入原国王 NPC、四阶物品交换合同、对话安全会话与全套持久化保存。",
    "status": "正式接通 · 隔离验证",
    "validation": "已做原居民分派、八图 objective、四阶实物交换守卫与会话生命周期校验；严格保持无副作用与零跨档状态泄露。"
  },
  {
    "id": "runtime-bounty-d-killer-bee",
    "category": "sidequest",
    "title": "Rank D·杀人毒蜂讨伐",
    "region": "晨辉王城酒馆看板 / 晨辉郊外东侧 (960, 480)",
    "type": "悬赏讨伐",
    "trigger": "完成序章末节拍 ch00_arrive_temple 后在晨辉酒馆看板揭单；前往晨辉郊外东侧调查专属杀人毒蜂，战胜后返回酒馆领赏员处确认领赏。",
    "reward": "银手镯（防具 armor，2056，防御15）×1、特级以太（5，恢复120MP）×2、1500G。",
    "desc": "序章末完成后在晨辉酒馆看板明确接取，前往晨辉郊外东侧的专属杀人毒蜂，击破后返回独立领赏员确认一次领奖。目标沿原Lv1普通模板，可逃跑重试；普通同种击杀不计完成。三项奖励均有容量才同时发放，容量不足保留待领，重复领奖不再发放。新周目清本轮D进度，合法奖励按原规则继承，继承物不代替本轮接取或完成。",
    "status": "正式接通 · 隔离验证",
    "validation": "已有独立域、原地图入口与冷读隔离证据，奖励收录与同步换档撤权有对应验证；胜利采用准确合成来源，不代表自然战斗或真人视觉验收。当前适配为普通杀人毒蜂、银手镯与特级以太，不是蜂后、白银胸甲或高级以太；无不可逃跑精英、猎人勋章、专属印章或世界图骷髅标记。"
  },
  {
    "id": "runtime-bounty-c-scorpion",
    "category": "sidequest",
    "title": "Rank C·沼泽毒蝎讨伐",
    "aliases": [
      "Rank C",
      "C级悬赏",
      "沼泽毒蝎讨伐"
    ],
    "region": "晨辉王城酒馆看板 / 沼泽洞窟地下一层西廊 (256, 480)",
    "type": "悬赏讨伐",
    "trigger": "本周目完成并领取Rank D悬赏后，在原晨辉酒馆评级看板选择C级并明确接取；沿原章节与队伍等级入场门禁前往沼泽洞窟地下一层。",
    "reward": "秘银匕首（2003，物攻10，无附带技能）×1、万能药（12，解除多种异常）×3、一次5000G。",
    "desc": "本周目D级完成并领赏后开放C级；原看板明确接取，前往沼泽洞窟地下一层西廊专属毒蝎，击破后返回原酒馆领赏员一次领赏。目标沿原Lv5普通毒蝎完整模板，可以逃跑重试；普通同种击杀不代替专属目标。保留原章节和队伍等级门禁。新周目清本轮D/C进度，继承奖励不代替本轮接取或完成。",
    "status": "正式接通 · 隔离验证",
    "validation": "已有域、来源与奖励隔离证据，另已归档原任务页、私槽保存/独立进程读档及新周目确认的Metal观察，以及原地图身体往返。往返使用准确合成胜利并保留旧评级窗退树错误；后续评级窗最小修复有独立烟测，未重跑整个往返。原任务页历史退出警告身份未知；不代表自然战斗、硬件输入或真人视觉验收。目标不是毒曼陀罗，不新增施毒技能、浮岛或Lv15～25挑战。"
  },
  {
    "id": "runtime-bounty-b-zombie-dragon",
    "category": "sidequest",
    "title": "Rank B·僵尸龙讨伐",
    "aliases": [
      "Rank B",
      "B级悬赏",
      "僵尸龙讨伐"
    ],
    "region": "晨辉王城酒馆看板 / 混沌神殿南侧中央通道",
    "type": "悬赏讨伐",
    "trigger": "本周目完成并领取D级、C级悬赏后，在原晨辉酒馆评级看板选择B级并明确接取；沿原章节与队伍等级入场门禁前往混沌神殿。",
    "reward": "秘银盾（2025，防御8、魔防2、物理回避12%，无职业限制）×1、圣水（20，对不死系造成100伤害）×10、一次15000G。",
    "desc": "本周目D级、C级均完成并领赏后开放B级；原看板明确接取，前往混沌神殿南侧中央通道的专属僵尸龙，击破后返回原酒馆领赏员一次领取秘银盾×1、圣水×10和15000G。目标依据原僵尸龙出现位置资料适配独立显式悬赏来源，沿原Lv5普通模板、75%可逃；普通同种击杀不算专属目标，保留原章节与队伍等级门禁。容量不足保留待领，重复领奖不再发放。新周目清本轮D/C/B进度，合法奖励按原规则继承，继承物不替代本轮接取或完成。",
    "status": "正式接通 · 隔离验证",
    "validation": "已有域、奖励与新周目清旗证据，另已归档原任务页、私槽保存/独立进程读档及新周目确认的Metal观察。地图往返为前段撞桌失败后按原观测跨进程重建续段，不能称同进程全绿；原战斗结果返图使用准确合成胜利，保留一项外置奖励预期错误及同轮收据核对。延期撤权与任务页的历史ObjectDB退出警告身份未知。不代表自然战斗、硬件输入或真人视觉验收。原生态与加兰德未改；不是骨龙Boss、金字塔或Lv28～38挑战，不创建龙骨重盾。"
  },
  {
    "id": "runtime-bounty-a-king-chimera",
    "category": "sidequest",
    "title": "Rank A·强化奇美拉讨伐",
    "aliases": [
      "Rank A",
      "A级悬赏",
      "强化奇美拉讨伐"
    ],
    "region": "晨辉王城酒馆看板 / 混沌神殿南侧中央通道",
    "type": "悬赏讨伐",
    "trigger": "本周目完成并领取D级、C级、B级悬赏后，在原晨辉酒馆评级看板选择A级并明确接取；沿原章节与队伍等级入场门禁前往混沌神殿。",
    "reward": "耐火斗篷（2041，防御8、魔防10，火伤×0.5）×1、护盾指环（2040，防御8，开场获得护盾 Protect，不具魔法反射效果）×1、一次35000G。",
    "desc": "本周目D级、C级、B级均完成并领赏后开放A级；原看板明确接取，前往混沌神殿南侧中央通道的专属强化奇美拉，击破后返回原酒馆领赏员一次领取耐火斗篷×1、护盾指环×1和35000G。目标依据原强化奇美拉出现位置资料适配独立显式悬赏来源，沿原Lv5普通完整模板、75%可逃；普通同种击杀不算专属目标，保留原章节与队伍等级门禁。三项奖励均有容量才一并发放，容量不足保留待领，重复领奖不再发放。新周目清本轮D/C/B/A进度，合法奖励按原规则继承，继承装备不替代本轮前置或完成。这是现有混沌神殿与普通强化奇美拉的适配，不含原稿火山烈焰目标、Lv40～50挑战、烈焰法袍或反射戒指。",
    "status": "正式接通 · 隔离验证",
    "validation": "核心headless阶段及首通知收录修复证据保留，另已归档各自冻结源的原私槽保存、独立进程读档与新周目确认、任务页、道具与百科、地图来源、原战斗结果返混沌及酒馆窗口共存的Metal证据。任务页整卡边界与战斗奖励类型比较的外置断言失败原件保留，独立补验不洗原红；任务页一条未知退出警告及既有RGB8警告未据新通过结果宣称修复。胜利使用准确合成、资格为明示私前置，地图仅局部身体移动；各阶段不相加冒完整全绿、自然通关战斗、硬件或真人视觉验收。仍是普通强化奇美拉适配，原生态与加兰德未改，不含火山烈焰目标或原稿两奖。"
  },
  {
    "id": "runtime-bounty-s-death-eye",
    "category": "sidequest",
    "title": "Rank S·死神之眼讨伐",
    "aliases": [
      "Rank S",
      "S级悬赏",
      "死神之眼讨伐"
    ],
    "region": "晨辉王城酒馆看板 / 混沌神殿南侧中央通道",
    "type": "悬赏讨伐",
    "trigger": "本周目完成并领取D级、C级、B级、A级悬赏，且本周目已通关后，在原晨辉酒馆评级看板选择S级并明确接取；保留原章节与队伍等级入场门禁。",
    "reward": "钻石胸甲（2044，防御40、魔防10，雷伤×0.5）×1、盗贼小手（2039，速度4）×1、一次100000G。",
    "desc": "本周目D级、C级、B级、A级均完成并领赏，且本周目已通关后开放S级；原看板明确接取，前往混沌神殿南侧中央通道的专属死神之眼，击破后返回原酒馆领赏员一次领取钻石胸甲×1、盗贼小手×1和100000G。目标使用原Lv5普通不死系完整模板、75%可逃；普通同种击杀不算专属目标，保留原章节与队伍等级门禁。三项奖励均有容量才一并发放，容量不足保留待领，重复领奖不再发放。新周目清本轮D/C/B/A/S进度，需重新完成本轮前置与通关，继承装备和累计通关次数不能替代本轮来源。这是现有混沌神殿与普通死神之眼的适配，不含原稿虚空裁决者、次元裂隙孤岛或Lv60挑战，奖励不是缎带与大师徽章。",
    "status": "正式接通 · 隔离验证",
    "validation": "保留核心headless各阶段与旗级校验接线原红；已补入原评级订单、任务页、道具百科、地图来源、私槽保存/独立读档与新周目确认、原战斗结果返混沌的Metal证据。NG确认提示遮挡经本页局部修复后独立验证，原整链与修后补验分列；任务页两个函数状态泄漏及字符串名退出诊断仍未归因，原结果链保留敌先手下两项额外预期失败、目标预览未覆盖，既有RGB8警告保留。通关及前序资格为明示私准备，胜利准确合成，通关后路线仅局部避门；各进程/阶段不合称完整自然流程、初版全绿或真人视觉验收。来源仍据121原混沌记录，原生态005–011与2111缎带独占来源保持。"
  },
  {
    "id": "runtime-tavern-ale-stone-route",
    "category": "sidequest",
    "title": "晨辉清冽淡麦酒 · 石径神殿路线提示",
    "aliases": ["淡麦酒", "石路情报", "始源神殿路线", "微醺", "侍者醉话", "已购情报回看"],
    "region": "晨辉王城酒馆 · 淡麦酒侍者",
    "type": "酒馆探索情报",
    "trigger": "向独立淡麦酒侍者点单，首次明确确认购买需10G；查看、取消或金币不足不扣钱。",
    "reward": "路线提示：沿晨辉郊外中央石径向北，经原入口进入始源神殿；已购后在同一点单处免费重读。已访问晨辉酒馆且本档已购时，可在原地理卷酒馆详情回看当前可核实的已购情报。",
    "desc": "首购明确确认支付10G并记一杯；已购免费重读不计杯，另选“再来一杯 10G”才续杯。1～2杯微醺、3杯起醉酒；每次实际饮酒后重新计算醒酒步距，累计30实际移动步后逐渐清醒；静止、撞墙无位移或对白锁定不计步，离馆立即清醒，酒量不存档。醉酒时仅这位侍者在原报价前多说一句醉话。动效遵循原屏幕震动设置，关闭时不显示醉步、色散或摇镜；不改变身体移动、碰撞或战斗。查看、取消或金币不足不扣钱，不含北林暗道、宝箱计数或其它酒档。",
    "status": "首档10G已接通 · 隔离验证",
    "validation": "首档交易与私保存冷读、微醺实际移动及离馆清理、单侍者醉话、原地理卷已购回看均有独立隔离证据；不代表全城NPC、四档酒、自然完整游玩或真人视觉验收。"
  },
  {
    "id": "runtime-tavern-stout-element-intel",
    "category": "sidequest",
    "title": "晨辉矮人黑啤 · 沼泽洞窟怪物属性情报",
    "aliases": ["矮人黑啤", "沼泽洞窟情报", "元素倍率情报", "黑啤点单", "已购属性重读"],
    "region": "晨辉王城酒馆 · 矮人黑啤侍者",
    "type": "酒馆探索情报",
    "trigger": "向独立矮人黑啤侍者点单，首次明确确认购买需50G；持有情报已购后可在酒馆常驻情报浏览器免费重读。",
    "reward": "属性情报：获取沼泽洞窟绿色粘液怪的现有元素承伤与弱点倍率；已购后永久收录入酒馆情报浏览器，随时免费回看。",
    "desc": "首购明确确认支付50G并解锁一条属性情报；已购免费重读，不重复扣费。金币不足时按钮自动置灰。弹窗遵循独立 ConfirmationDialog 架构，在发生场景切换或对话锁定时安全撤权；情报浏览器仅在已购状态下激活，支持高对比度夜间阅读。",
    "status": "首档50G已接通 · 隔离验证",
    "validation": "首档交易扣费与金币门禁校验、已购状态免付费重读、怪物情报浏览器激活与离窗清理均已完成独立隔离验证；纯读查询无全局副作用。"
  },
  {
    "id": "sq-01",
    "category": "sidequest",
    "title": "海龙西尔多拉的长眠 (Dragon Requiescat)",
    "region": "第三世界 · 海盗密窟深处",
    "type": "史诗召唤兽契约",
    "trigger": "融合世界后重访昔日海盗海蚀洞穴深处",
    "desc": "前往海盗密窟深处吊唁牺牲的忠诚海龙，法丽斯的呼唤激荡起海潮共振，西尔多拉的魂魄显现化为最高阶水属性召唤兽【西尔多拉】，并赐予潮汐破灭击。",
    "reward": "最高阶水属性召唤兽【西尔多拉 (Syldra)】契约、法丽斯专属共鸣特技"
  },
  {
    "id": "sq-02",
    "category": "sidequest",
    "title": "矮人锻造大师的遗愿 (Dwarven Masterpiece)",
    "region": "地下矮人王国 · 熔岩深渊锻造所",
    "type": "远古神兵重铸",
    "trigger": "在大海沟与流沙迷宫收集 4 块远古精金矿石",
    "desc": "寻获四块上古陨落精金矿石，拜访避世千年的矮人传奇铁匠。在极热地脉熔火中锤炼七天七夜，重铸出破除一切魔防的无双战斧【符文之斧】。",
    "reward": "SS级双手重斧【符文之斧】（攻击力 +172，消耗 MP 触发 100% 必定暴击真伤）"
  },
  {
    "id": "sq-03",
    "category": "sidequest",
    "title": "古代贤者吉多的预言 (Sage Ghido Library)",
    "region": "孤岛深海洞窟 · 贤者之室",
    "type": "禁断古代魔导研习",
    "trigger": "驾驶潜艇潜入海底裂隙进入被沉没的孤岛洞窟",
    "desc": "协助 700 岁高龄的智慧长寿龟贤者吉多整理因地壳变动遗失的四本古代天文学羊皮卷轴，解读双月轨道交会之秘，习得最高位时空魔法【流星群】。",
    "reward": "8阶时空黑魔法【流星群 (Meteor)】、贤者手杖"
  },
  {
    "id": "sq-04",
    "category": "sidequest",
    "title": "飞龙最后的孤雏 (The Last Wyvern)",
    "region": "龙之谷极顶 · 飞龙之巢",
    "type": "神圣坐骑进化",
    "trigger": "第三世界蕾娜前往龙之谷寻找濒死飞龙",
    "desc": "为了拯救最后一只濒临绝种的纯种飞龙，蕾娜不惜吞服剧毒飞龙草以证纯洁之心。飞龙涅槃蜕变为通体光耀的【圣白飞龙】，化身全地形自由滑翔坐骑。",
    "reward": "【圣白飞龙】坐骑形态进化、圣龙羽翼护符（全速度 +15）"
  },
  {
    "id": "sq-05",
    "category": "sidequest",
    "title": "幻影之村环球马拉松 (World Marathon)",
    "region": "幻影之村 · 旅人秘密公会",
    "type": "世界大探索竞速",
    "trigger": "骑乘黄色陆行鸟沿世界边缘外环不间断奔跑一周",
    "desc": "接受幻影村神秘旅行商人的极限挑战，骑乘黄色陆行鸟穿越各大平原、跨越陆行鸟森林，沿整座融合世界的大陆海岸线环球一周完成壮举。",
    "reward": "疾风饰品【极速之靴 (Hermes Sandals)】（战斗开始自动常驻加速 Haste 状态）"
  },
  {
    "id": "sq-06",
    "category": "sidequest",
    "title": "狼人凯鲁卡的故乡誓言 (Kelger Village Trials)",
    "region": "晓之战士故里 · 狼人隐居之村",
    "type": "宗师武斗决斗",
    "trigger": "加拉夫陨落后率队探访狼人避世村落",
    "desc": "为了继承已故晓之战士凯鲁卡的遗志，队伍中的武斗角色需在狼人角斗场连续单挑三位狼族剑豪长老，凭借肉身与刀剑之理传承不朽心法。",
    "reward": "奥义秘籍【暗黑剑圣心法】、凯鲁卡之牙（对兽人系增伤 50%）"
  },
  {
    "id": "sq-07",
    "category": "sidequest",
    "title": "莫古利村庄地底大营救 (Mog Village Rescue)",
    "region": "地底迷宫裂隙 · 莫古利之乡",
    "type": "族群盟约与通信网解禁",
    "trigger": "掉入地底落穴拯救被恐龙怪追击的迷途小莫古利",
    "desc": "在地穴深处护送小莫古利安然返乡，获得全村莫古利的好感信任，受赠莫古利玩偶并正式开启连接两大世界的【莫古利跨界邮差通信网】。",
    "reward": "解除莫古通信网全部锁链、莫古之铠、精灵之冠"
  },
  {
    "id": "sq-08",
    "category": "sidequest",
    "title": "沉睡的欧米茄遗骸调查 (Omega Investigation)",
    "region": "次元裂缝沙漠 · 机械废墟深处",
    "type": "终极隐藏首领战备破译",
    "trigger": "搜集世界 3 处古代魔导机械核心残片",
    "desc": "在古代机械浮空要塞与次元废墟中探寻远古文明遗留的 3 块电路板碎片，交给工程师米德解析古代杀戮机械欧米茄（Omega）的核心程序弱点。",
    "reward": "战术芯片【机械过载指令】（战斗中使用可强制让欧米茄瘫痪 1 回合）"
  },
  {
    "id": "sq-09",
    "category": "sidequest",
    "title": "神龙封印的真相 (Dragon God Seal)",
    "region": "天空圣所 · 潮汐神庙石碑",
    "type": "太古誓约与灭团免死对策",
    "trigger": "阅读四座天空圣所石碑的远古龙语铭文",
    "desc": "揭开次元之隙宝箱守卫【神龙】曾作为星球守护神的悲壮过去。通过圣所试炼获得抵御神龙开局灭队技【万丈海啸 (Tidal Wave)】的关键水神圣物。",
    "reward": "神器【水神项圈】与【珊瑚之戒】（受水属性攻击转化为 100% HP 治疗）"
  },
  {
    "id": "sq-10",
    "category": "sidequest",
    "title": "大图书馆禁断十四卷 (Forbidden Volumes)",
    "region": "古代大图书馆 · 封印暗影地下室",
    "type": "青魔与学者终极传承",
    "trigger": "击败 4 名附身在禁断魔导书上的纸魔守卫",
    "desc": "古代大图书馆地下禁区封存着记录世界真理的第 14 卷古籍。驱逐附身其中的书魔怨灵后，学者职业将迎来最终觉醒，获得看穿一切数值的透视之瞳。",
    "reward": "学者觉醒特技【深度全知解析 (Analyze Mastery)】、古代魔导黑袍"
  }
]
,
  tail_weapons: [
  {
    "id": "tail-01",
    "category": "tail_relic",
    "name": "阿克塞尔匕首 (Axel Dagger)",
    "tail_source": "粉色尾巴 (Pink Tail)",
    "type": "单手匕首",
    "job": "盗贼 / 忍者 / 舞者 / 自由人 / 模仿师",
    "stats": "攻击力 +90, ATB充能速率 ×1.25",
    "effect": "【时间律动】本人当前合法主手充能效率提升 25%，与加速 (Haste) 叠乘达到 1.875 倍极致流速。禁止副手。",
    "origin": "收集粉色尾巴与隐藏尾巴收藏家交换",
    "rarity": "★★★★★ 彩尾传说神兵"
  },
  {
    "id": "tail-02",
    "category": "tail_relic",
    "name": "瓦尔哈拉圣剑 (Valhalla)",
    "tail_source": "灰色尾巴 (Gray Tail)",
    "type": "骑士圣剑",
    "job": "战士 / 骑士 / 圣骑士 / 自由人 / 模仿师",
    "stats": "攻击力 +115, 物理防御 +5",
    "effect": "【双极护壁】圣属性与暗属性承伤各减免 50%（承伤系数 ×0.5），与既有抗性乘法叠加。禁止副手。",
    "origin": "收集灰色尾巴与隐藏尾巴收藏家交换",
    "rarity": "★★★★★ 彩尾传说神兵"
  },
  {
    "id": "tail-03",
    "category": "tail_relic",
    "name": "嗜血长枪 (Blood Lance)",
    "tail_source": "红色尾巴 (Red Tail)",
    "type": "风属性长枪",
    "job": "龙骑士 / 骑士 / 维京人 / 自由人 / 模仿师",
    "stats": "攻击力 +101, 风属性附魔",
    "effect": "【鲜血吮吸】普通主武器命中或跳跃落地命中，按目标实际扣除 HP 的 100% 真实回复自身生命！禁止副手。",
    "origin": "收集红色尾巴与隐藏尾巴收藏家交换",
    "rarity": "★★★★★ 彩尾传说神兵"
  },
  {
    "id": "tail-04",
    "category": "tail_relic",
    "name": "究极之刃 (Ultima Blade)",
    "tail_source": "金色尾巴 (Gold Tail)",
    "type": "单手圣剑",
    "job": "战士 / 骑士 / 魔法剑士 / 符文骑士 / 自由人 / 模仿师",
    "stats": "攻击力 +120, 物防 +3, 精神 +3, 圣属性",
    "effect": "【光芒万丈】满血时触发神圣大增伤，攻击力攀升至极值；伴随圣光破邪撕裂。禁止副手。",
    "origin": "收集金色尾巴与隐藏尾巴收藏家交换",
    "rarity": "★★★★★ 彩尾传说神兵"
  },
  {
    "id": "tail-05",
    "category": "tail_relic",
    "name": "人鱼竖琴 (Mermaid Harp)",
    "tail_source": "蓝色尾巴 (Blue Tail)",
    "type": "穿透音波竖琴",
    "job": "吟游诗人 / 游荡乐师 / 自由人 / 模仿师",
    "stats": "攻击力 +68, 魔法攻击 +3, 精神 +3",
    "effect": "【魅惑潮音】对敌方全员造成无衰减音波穿透伤害，并附带 30% 概率全体混乱 (Confuse) 控场。禁止副手。",
    "origin": "收集蓝色尾巴与隐藏尾巴收藏家交换",
    "rarity": "★★★★★ 彩尾传说神兵"
  },
  {
    "id": "tail-06",
    "category": "tail_relic",
    "name": "火箭拳 (Rocket Punch)",
    "tail_source": "黄色尾巴 (Yellow Tail)",
    "type": "穿甲机械拳爪",
    "job": "武僧 / 机械师 / 自由人 / 模仿师",
    "stats": "攻击力 +105, 暴击率 +30%",
    "effect": "【火箭飞冲】高暴击、高穿甲，无视目标 30% 基础物理护甲，造成重击击退效果。禁止副手。",
    "origin": "收集黄色尾巴与隐藏尾巴收藏家交换",
    "rarity": "★★★★★ 彩尾传说神兵"
  },
  {
    "id": "tail-07",
    "category": "tail_relic",
    "name": "彩尾自动弩 (Tail Auto Crossbow)",
    "tail_source": "绿色尾巴 (Green Tail)",
    "type": "双手机械连弩",
    "job": "机械师 / 游侠猎人 / 自由人 / 模仿师",
    "stats": "攻击力 +95, 双手持握",
    "effect": "【弹雨扫射】对敌方全体发射机械贯穿弩矢，无视前后排站位距离衰减，双手持握无法佩戴盾牌。",
    "origin": "收集绿色尾巴与隐藏尾巴收藏家交换",
    "rarity": "★★★★★ 彩尾传说神兵"
  }
]
};
export type GameDatabase = typeof GAME_DATABASE;
