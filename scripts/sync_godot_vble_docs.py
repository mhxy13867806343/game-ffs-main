#!/usr/bin/env python3
"""
自动从桌面上的 godot-2d-turn-based 项目同步最新研发规范与白皮书文档到 game-ffs-main (vble)
支持提取最新 16 卷核心架构白皮书、全域魔物/首领规范、每日研发进展，构建打包并推送到远程仓库。
"""

import os
import shutil
import subprocess
import sys
from datetime import datetime

GODOT_PROJECT_DIR = "/Users/hooksvue/Desktop/godot-2d-turn-based"
WORKSPACE_DIR = "/Users/hooksvue/Desktop/game-ffs-main"
PUBLIC_DOCS_DIR = os.path.join(WORKSPACE_DIR, "public", "vble-docs")

# 24 卷白皮书映射表
WHITEPAPER_MAPPINGS = [
    ("news-world/new-world/01_WORLD_BIBLE_AND_NARRATIVE_DESIGN.md", "01_WORLD_BIBLE.md"),
    ("news-world/new-world/02_DUNGEON_TOPOLOGY_AND_GLOBAL_LOCATIONS.md", "02_DUNGEON_TOPOLOGY.md"),
    ("news-world/new-world/03_BOSS_TACTICS_AND_BESTIARY_ENCYCLOPEDIA.md", "03_BOSS_TACTICS.md"),
    ("news-world/new-world/04_JOB_SYSTEM_AND_GROWTH_ARCHITECTURE.md", "04_JOB_SYSTEM.md"),
    ("news-world/new-world/05_EQUIPMENT_REPRESENTATION_AND_MACRO_ECONOMY.md", "05_EQUIPMENT_ECONOMY.md"),
    ("news-world/new-world/06_TRAVEL_VEHICLES_AND_EXPLORATION_MATRIX.md", "06_TRAVEL_VEHICLES.md"),
    ("news-world/new-world/07_SIDEQUESTS_MINIGAMES_AND_LORE_SECRETS.md", "07_SIDEQUESTS_SECRETS.md"),
    ("news-world/new-world/08_GAME_SYSTEM_ARCHITECTURE_AND_PERSISTENCE.md", "08_SYSTEM_ARCHITECTURE.md"),
    ("news-world/new-world/09_VOID_CASTLE_AND_CELESTIAL_SOLAR_SPEC.md", "09_VOID_CASTLE.md"),
    ("news-world/new-world/10_THIRTY_CHAPTERS_CRYSTALS_AND_FIVE_ELEMENTS_SPEC.md", "10_CRYSTALS_ELEMENTS.md"),
    ("news-world/new-world/11_BOSS_AND_CHEST_TURN_LIMIT_SPEC.md", "11_TURN_LIMIT_SPEC.md"),
    ("news-world/new-world/12_BATTLE_EVENTS_CHOICE_RPS_SLIME_AND_MISS_EVASION_SPEC.md", "12_BATTLE_EVENTS_RPS.md"),
    ("news-world/agent-work/HERO_SANCTUARY_TECHNIQUES_CONTRACT_2026-10-17.md", "13_HERO_SANCTUARY.md"),
    ("news-world/agent-work/MYSIDIA_ADVANCED_COURSES_CONTRACT_2026-10-17.md", "14_MYSIDIA_ACADEMY.md"),
    ("news-world/agent-work/NINJA_TEACHING_CONTRACT_2026-10-17.md", "15_NINJA_TEACHING.md"),
    ("news-world/agent-work/LEGENDARY_ACQUISITION_AND_TAIL_EXCHANGE_CONTRACT_2026-10-18.md", "16_TAIL_EXCHANGE.md"),
    ("docs/CROSS_WORLD_BOSSES_AND_MONSTERS_SPEC.md", "17_CROSS_WORLD_BOSSES.md"),
    ("docs/MULTI_PHASE_BOSS_AND_STORY_SKILLS_SPEC.md", "18_MULTI_PHASE_BOSS_SKILLS.md"),
    ("docs/SKELETON_AND_REAPER_BOSS_NPC_SPEC.md", "19_SKELETON_REAPER_MYTH.md"),
    ("docs/NPC_OPTIONAL_INTERACTION_DESIGN_2026-10-23.md", "20_NPC_INTERACTIONS.md"),
    ("docs/TOWN_BUILDINGS_CEMETERY_SKY_CITY_SPEC.md", "21_SKY_CITY_TOWNS.md"),
    ("docs/AMAZON_CREATURES_AND_LEGENDS_SPEC.md", "22_AMAZON_ECOLOGY.md"),
    ("docs/RUIN_METEOR_REEF_DESIGN_2026-10-25.md", "23_RUIN_METEOR_REEF.md"),
    ("docs/CHAPTER_AND_SCENE_GENERATION_SPEC.md", "24_SCENE_GENERATION.md"),
]

def run_cmd(cmd, cwd=WORKSPACE_DIR):
    res = subprocess.run(cmd, shell=True, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return res.returncode, res.stdout.strip(), res.stderr.strip()

def sync_docs():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 开始同步 Godot 文档...")
    if not os.path.exists(GODOT_PROJECT_DIR):
        print(f"错误: 找不到 Godot 项目目录 {GODOT_PROJECT_DIR}")
        return False

    os.makedirs(PUBLIC_DOCS_DIR, exist_ok=True)
    synced_count = 0

    # 1. 同步 16 卷白皮书
    for src_rel, target_name in WHITEPAPER_MAPPINGS:
        src_path = os.path.join(GODOT_PROJECT_DIR, src_rel)
        target_path = os.path.join(PUBLIC_DOCS_DIR, target_name)
        if os.path.exists(src_path):
            shutil.copy2(src_path, target_path)
            synced_count += 1
        else:
            print(f"提示: 未找到源文件 {src_rel}")

    # 2. 同步 Master 总设计文档与最新研发交接文档
    master_src = os.path.join(GODOT_PROJECT_DIR, "news-world/new-world/MASTER_GAME_DESIGN_DOCUMENT.md")
    if os.path.exists(master_src):
        shutil.copy2(master_src, os.path.join(PUBLIC_DOCS_DIR, "MASTER_GAME_DESIGN_DOCUMENT.md"))

    # 查找 docs/ 下最新的 FEATURE_DEVELOPMENT_ASSIGNMENTS 文件
    docs_dir = os.path.join(GODOT_PROJECT_DIR, "docs")
    if os.path.exists(docs_dir):
        assign_files = [f for f in os.listdir(docs_dir) if f.startswith("FEATURE_DEVELOPMENT_ASSIGNMENTS_") and f.endswith(".md")]
        if assign_files:
            assign_files.sort(reverse=True)
            latest_assign = assign_files[0]
            shutil.copy2(os.path.join(docs_dir, latest_assign), os.path.join(PUBLIC_DOCS_DIR, "LATEST_DEV_SPEC.md"))
            print(f"已同步最新研发分工交接案: {latest_assign}")

    print(f"文档同步完成，共更新 {synced_count} 卷核心架构白皮书与最新研发文件。")
    return True

def build_and_push():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 正在执行 pnpm build 编译打包...")
    code, out, err = run_cmd("pnpm build")
    if code != 0:
        print(f"构建失败: {err}")
        return False
    print("构建成功！")

    # 检查是否有文件改动
    _, status_out, _ = run_cmd("git status --porcelain")
    if not status_out:
        print("工作区无改动，无需提交。")
        return True

    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    commit_msg = f"docs(vble): auto sync godot-2d-turn-based specifications ({now_str})"
    print(f"检测到文档或代码变更，正在提交并推送到 GitHub 远程仓库...")
    run_cmd("git add -A")
    run_cmd(f'git commit -m "{commit_msg}"')
    code, push_out, push_err = run_cmd("git push origin main")
    if code == 0:
        print("成功推送到远程 origin/main！GitHub Actions 将自动部署到在线预览页面。")
        return True
    else:
        print(f"推送失败: {push_err}")
        return False

if __name__ == "__main__":
    success = sync_docs()
    if success:
        build_and_push()
