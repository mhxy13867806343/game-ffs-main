const { chromium } = require('playwright');

async function findTabs() {
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

  const tabsInfo = await page.evaluate(() => {
    const wrappers = Array.from(document.querySelectorAll('.n-tabs-tab-wrapper'));
    
    return wrappers.map((wrapper, i) => {
      const parent = wrapper.parentElement;
      const grandParent = parent?.parentElement;
      
      return {
        index: i,
        offsetLeft: wrapper.offsetLeft,
        offsetWidth: wrapper.offsetWidth,
        text: wrapper.textContent.substring(0, 40),
        parentClasses: parent ? Array.from(parent.classList).slice(0, 3).join('.') : '',
        grandParentClasses: grandParent ? Array.from(grandParent.classList).slice(0, 3).join('.') : ''
      };
    }).filter(t => t.offsetLeft + t.offsetWidth > 360);
  });

  console.log('Overflowing tab wrappers:\n');
  tabsInfo.forEach(t => {
    console.log(`${t.index}. offsetLeft: ${t.offsetLeft} + width: ${t.offsetWidth} = ${t.offsetLeft + t.offsetWidth}`);
    console.log(`   text: "${t.text}..."`);
    console.log(`   parent: .${t.parentClasses}`);
    console.log(`   grandParent: .${t.grandParentClasses}`);
    console.log();
  });

  await browser.close();
}

findTabs().catch(console.error);
