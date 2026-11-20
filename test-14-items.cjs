const { chromium } = require('playwright');
const path = require('path');

const artifactsDir = '/opt/cursor/artifacts';

async function testAll14Items() {
  const browser = await chromium.launch({ headless: false });
  
  // 桌面测试
  const contextDesktop = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2
  });
  const pageDesktop = await contextDesktop.newPage();

  console.log('=== 1. SystemsView - 5项系统交互 ===');
  await pageDesktop.goto('http://localhost:5173/game-ffs-main/#/vble/systems', { 
    waitUntil: 'networkidle',
    timeout: 30000
  });
  await pageDesktop.waitForTimeout(2000);
  await pageDesktop.screenshot({ 
    path: path.join(artifactsDir, 'pr7-01-systems-desktop.png'),
    clip: { x: 0, y: 0, width: 1920, height: 900 }
  });

  console.log('=== 2. ItemsView - 3项商店/装备交互 ===');
  await pageDesktop.goto('http://localhost:5173/game-ffs-main/#/vble/items', { 
    waitUntil: 'networkidle'
  });
  await pageDesktop.waitForTimeout(2000);
  await pageDesktop.screenshot({ 
    path: path.join(artifactsDir, 'pr7-02-items-desktop.png'),
    clip: { x: 0, y: 0, width: 1920, height: 900 }
  });

  console.log('=== 3. EquipmentView - 1项装备方案 ===');
  await pageDesktop.goto('http://localhost:5173/game-ffs-main/#/vble/equipment', { 
    waitUntil: 'networkidle'
  });
  await pageDesktop.waitForTimeout(2000);
  await pageDesktop.screenshot({ 
    path: path.join(artifactsDir, 'pr7-03-equipment-desktop.png'),
    clip: { x: 0, y: 0, width: 1920, height: 900 }
  });

  console.log('=== 4. JobsView - 5项职业/战斗交互 ===');
  await pageDesktop.goto('http://localhost:5173/game-ffs-main/#/vble/jobs', { 
    waitUntil: 'networkidle'
  });
  await pageDesktop.waitForTimeout(2000);
  await pageDesktop.screenshot({ 
    path: path.join(artifactsDir, 'pr7-04-jobs-desktop.png'),
    clip: { x: 0, y: 0, width: 1920, height: 900 }
  });

  console.log('=== 5. ScenesView - 4项小游戏场景 ===');
  await pageDesktop.goto('http://localhost:5173/game-ffs-main/#/vble/scenes', { 
    waitUntil: 'networkidle'
  });
  await pageDesktop.waitForTimeout(2000);
  
  await pageDesktop.evaluate(() => {
    document.getElementById('world-topology-studio')?.scrollIntoView({ behavior: 'smooth' });
  });
  await pageDesktop.waitForTimeout(1000);
  
  await pageDesktop.screenshot({ 
    path: path.join(artifactsDir, 'pr7-05-scenes-desktop.png'),
    clip: { x: 0, y: 0, width: 1920, height: 900 }
  });

  await contextDesktop.close();

  // 窄屏测试
  const context360 = await browser.newContext({
    viewport: { width: 360, height: 640 },
    deviceScaleFactor: 2,
    hasTouch: true,
    isMobile: true
  });
  const page360 = await context360.newPage();

  console.log('=== 6. 窄屏360px - SystemsView ===');
  await page360.goto('http://localhost:5173/game-ffs-main/#/vble/systems', { 
    waitUntil: 'networkidle'
  });
  await page360.waitForTimeout(2000);
  await page360.screenshot({ 
    path: path.join(artifactsDir, 'pr7-06-systems-mobile.png'),
    fullPage: false
  });

  console.log('=== 7. 窄屏360px - ItemsView ===');
  await page360.goto('http://localhost:5173/game-ffs-main/#/vble/items', { 
    waitUntil: 'networkidle'
  });
  await page360.waitForTimeout(2000);
  await page360.screenshot({ 
    path: path.join(artifactsDir, 'pr7-07-items-mobile.png'),
    fullPage: false
  });

  await context360.close();
  await browser.close();
  
  console.log('\n=== 测试完成 ===');
  console.log('已生成7张截图，覆盖5个页面的14项新增说明');
}

testAll14Items().then(() => {
  console.log('\n✓ 所有截图已保存到 /opt/cursor/artifacts/');
  process.exit(0);
}).catch(err => {
  console.error('测试失败:', err);
  process.exit(1);
});
