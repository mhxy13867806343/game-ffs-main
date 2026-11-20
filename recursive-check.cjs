const { chromium } = require('playwright');

async function recursiveCheck() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 360, height: 640 }
  });
  const page = await context.newPage();

  await page.goto('http://localhost:5173/game-ffs-main/#/vble/scenes', { 
    waitUntil: 'networkidle'
  });
  await page.waitForTimeout(2000);

  // 隐藏header确认不是原因
  await page.evaluate(() => {
    document.querySelector('header').style.display = 'none';
  });

  // 递归检查所有元素的right边界
  const culprits = await page.evaluate(() => {
    const vw = window.innerWidth;
    const results = [];
    
    function checkElement(el, depth = 0, path = []) {
      if (depth > 15) return;
      
      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      
      // 检查right边界是否超出viewport
      if (rect.right > vw + 1) {
        // 检查是否在overflow容器内
        let inScrollContainer = false;
        let parent = el.parentElement;
        while (parent && parent !== document.body) {
          const pcs = window.getComputedStyle(parent);
          if (pcs.overflowX === 'auto' || pcs.overflowX === 'scroll' || pcs.overflowX === 'hidden') {
            inScrollContainer = true;
            break;
          }
          parent = parent.parentElement;
        }
        
        if (!inScrollContainer) {
          const currentPath = [...path, {
            tag: el.tagName,
            classes: Array.from(el.classList).slice(0, 3).join('.'),
            id: el.id
          }];
          
          results.push({
            path: currentPath.map(p => `${p.tag}${p.id ? `#${p.id}` : ''}.${p.classes}`).join(' > '),
            width: Math.round(rect.width),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            overflow: Math.round(rect.right - vw),
            display: cs.display,
            position: cs.position,
            flexShrink: cs.flexShrink,
            minWidth: cs.minWidth,
            maxWidth: cs.maxWidth,
            whiteSpace: cs.whiteSpace,
            text: el.textContent ? el.textContent.substring(0, 40).replace(/\s+/g, ' ') : ''
          });
        }
        
        // 继续检查子元素
        Array.from(el.children).forEach(child => {
          const childPath = [...path, {
            tag: el.tagName,
            classes: Array.from(el.classList).slice(0, 2).join('.'),
            id: el.id
          }];
          checkElement(child, depth + 1, childPath);
        });
      }
    }
    
    checkElement(document.body);
    
    return {
      bodyScrollWidth: document.body.scrollWidth,
      culprits: results.slice(0, 30)
    };
  });

  console.log('Body scrollWidth:', culprits.bodyScrollWidth);
  console.log('\nElements with right > viewport (not in scroll containers):\n');
  
  culprits.culprits.forEach((el, i) => {
    console.log(`${i+1}. ${el.path}`);
    console.log(`   width: ${el.width}px | left: ${el.left} → right: ${el.right} (overflow: +${el.overflow}px)`);
    console.log(`   display: ${el.display} | position: ${el.position}`);
    console.log(`   flexShrink: ${el.flexShrink} | minWidth: ${el.minWidth} | whiteSpace: ${el.whiteSpace}`);
    if (el.text) console.log(`   text: "${el.text}..."`);
    console.log();
  });

  await browser.close();
}

recursiveCheck().catch(console.error);
