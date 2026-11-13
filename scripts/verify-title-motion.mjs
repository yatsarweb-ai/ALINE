import {chromium,webkit} from 'playwright-core';
import assert from 'node:assert/strict';
for(const engine of [chromium,webkit]){
 const browser=await engine.launch(engine===chromium?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{});
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
 assert(await page.locator('.collections h2 .scroll-letter').count()>10);
 const letter=page.locator('.collections h2 .scroll-letter').first();
 const initial=await letter.evaluate(e=>getComputedStyle(e).transform);
 await page.locator('.collections h2').scrollIntoViewIfNeeded();
 await page.evaluate(()=>window.scrollBy(0,200));await page.waitForTimeout(100);
 const end=await letter.evaluate(e=>getComputedStyle(e).transform);
 assert.notEqual(initial,end,'Reversible title must move');
 await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(100);
 const restored=await letter.evaluate(e=>getComputedStyle(e).transform);
 const values=s=>s.match(/-?\d+(?:\.\d+)?/g).map(Number);assert(values(initial).every((v,i)=>Math.abs(v-values(restored)[i])<.001));
 for(const y of [200,245,270,600,2000,100,0]){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(60)}
 await page.waitForTimeout(2000);
 await page.screenshot({path:`motion-${engine.name()}-390.png`});
 assert.equal(await page.locator('.pin-spacer').count(),1);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
 assert.deepEqual(errors,[]);
 await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.locator('.pin-spacer').count(),1);
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(150);
 assert(await page.locator('.scroll-letter').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='1')));
 const fallback=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await fallback.goto('http://localhost:3000');await fallback.waitForTimeout(4500);
 assert(await fallback.locator('.scroll-letter').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='1')),'CSS fallback must show all titles without JS');
 console.log(engine.name(),'PASS initial markup, reversibility, fast scroll, reload, reduced motion, no-JS fallback');
 await browser.close();
}

