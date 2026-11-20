const { chromium } = require('playwright');

async function checkTabsContainer() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 360, height: 640 }
  });
  const page = await context.newPage();

  await page.goto('http://localhost:5173/game-ffs-main/#/vble/scenes', { 
    waitUntil: 'networkidle'
  });
  await page.waitForTimeout(2000);

  await page.evaluate(() => {
    document.querySelector('header').style.display = 'none';
  });

  const info = await page.evaluate(() => {
    const rail = document.querySelector('.n-tabs-rail');
    const nav = document.querySelector('.n-tabs-nav');
    const tabs = document.querySelector('.n-tabs');
    
    const getInfo = (el, name) => {
      if (!el) return { name, found: false };
      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return {
        name,
        width: Math.round(rect.width),
        scrollWidth: el.scrollWidth,
        overflow: cs.overflow,
        overflowX: cs.overflowX,
        display: cs.display
      };
    };
    
    return {
      tabs: getInfo(tabs, 'n-tabs'),
      nav: getInfo(nav, 'n-tabs-nav'),
      rail: getInfo(rail, 'n-tabs-rail')
    };
  });

  console.log('Tabs container hierarchy:\n');
  console.log('n-tabs:', info.tabs);
  console.log('\nn-tabs-nav:', info.nav);
  console.log('\nn-tabs-rail:', info.rail);

  await browser.close();
}

checkTabsContainer().catch(console.error);
