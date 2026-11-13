import {chromium,webkit} from 'playwright-core';
import assert from 'node:assert/strict';
for(const engine of ['chromium','webkit']){
 const browser=await (engine==='chromium'?chromium:webkit).launch(engine==='chromium'?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{});
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:844},isMobile:width===390,hasTouch:width===390});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{window.entryCounts={};const original=Element.prototype.animate;Element.prototype.animate=function(...args){if(this.classList.contains('media-piece'))window.entryCounts[this.className]=(window.entryCounts[this.className]||0)+1;return original.apply(this,args)}});
  await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
  assert.equal(await page.locator('.multimedia-gallery video[src]').count(),0,'Videos must not load above gallery');
  assert.equal(await page.locator('.pin-spacer').count(),1,'One hero pin only');
  for(const offset of [50,150,250,0,210,0]){await page.evaluate(y=>window.scrollTo(0,y),offset);await page.waitForTimeout(120)}
  await page.screenshot({path:`gallery-${engine}-${width}-hero.png`});
  for(const cell of await page.locator('.media-piece').all()){
   await cell.scrollIntoViewIfNeeded();await page.waitForTimeout(800);
   assert.equal(await cell.getAttribute('data-entered'),'true');
  }
  const videos=page.locator('.multimedia-gallery video');
  for(const video of await videos.all()){
   await video.scrollIntoViewIfNeeded();await page.waitForTimeout(1300);
   const state=await video.evaluate(v=>({src:v.currentSrc,paused:v.paused,error:v.error?.message,muted:v.muted,inline:v.playsInline}));
   assert(state.src&&state.muted&&state.inline&&!state.error,JSON.stringify(state));
   // Windows WebKit may not ship an H.264 decoder: report rather than claim playback.
   console.log(engine,width,state);
  }
  await page.locator('.multimedia-gallery').screenshot({path:`gallery-${engine}-${width}.png`});
  await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(800);
  assert(await videos.evaluateAll(v=>v.every(x=>x.paused)),'Offscreen videos must pause');
  await page.locator('.media-h').scrollIntoViewIfNeeded();await page.waitForTimeout(700);
  assert(await page.evaluate(()=>Object.values(window.entryCounts).every(n=>n===1)),'Entries must run once');
  assert.equal(await page.locator('.media-piece').evaluateAll(e=>e.every(x=>getComputedStyle(x).opacity==='1')),true);
  for(const w of [320,844,390]){await page.setViewportSize({width:w,height:w===844?390:844});await page.waitForTimeout(500);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow');assert.equal(await page.locator('.pin-spacer').count(),1)}
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(250);
  assert(await videos.evaluateAll(v=>v.every(x=>x.paused)),'Reduced motion pauses videos');
  assert.equal(await page.locator('.pin-spacer').count(),0,'Reduced motion removes pin');
  assert.deepEqual(errors,[]);
  await page.close();
 }
 await browser.close();
}
console.log('PASS: gallery, lazy videos, pause, once-only motion, pin lifecycle, responsive and console.');
