const { chromium } = require('playwright');

async function checkOffset() {
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
    const bodyClientWidth = document.body.clientWidth;
    const results = [];
    
    function check(el, depth = 0) {
      if (depth > 12) return;
      
      // 计算元素的右边界（offsetLeft + offsetWidth）
      const rightEdge = el.offsetLeft + el.offsetWidth;
      
      if (rightEdge > bodyClientWidth + 5) {
        const cs = window.getComputedStyle(el);
        results.push({
          tag: el.tagName,
          classes: Array.from(el.classList).slice(0, 3).join('.'),
          offsetLeft: el.offsetLeft,
          offsetWidth: el.offsetWidth,
          rightEdge,
          overflow: rightEdge - bodyClientWidth,
          position: cs.position,
          display: cs.display,
          float: cs.float
        });
      }
      
      Array.from(el.children).forEach(child => check(child, depth + 1));
    }
    
    check(document.body);
    
    return {
      bodyClientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      results: results.slice(0, 20)
    };
  });

  console.log('Body clientWidth:', info.bodyClientWidth);
  console.log('Body scrollWidth:', info.bodyScrollWidth);
  console.log('\nElements with offsetLeft + offsetWidth > clientWidth:\n');
  
  info.results.forEach((el, i) => {
    console.log(`${i+1}. <${el.tag}> .${el.classes}`);
    console.log(`   offsetLeft: ${el.offsetLeft} + offsetWidth: ${el.offsetWidth} = ${el.rightEdge}`);
    console.log(`   overflow: +${el.overflow}px | position: ${el.position} | display: ${el.display}`);
    console.log();
  });

  await browser.close();
}

checkOffset().catch(console.error);
