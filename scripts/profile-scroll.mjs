import {chromium} from 'playwright-core';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});await page.waitForTimeout(3000);
await page.evaluate(()=>{window.slowTasks=[];new PerformanceObserver(list=>window.slowTasks.push(...list.getEntries().map(e=>e.duration))).observe({type:'longtask'});});
const result=await page.evaluate(async()=>{const deltas=[];let prev=performance.now();const max=document.documentElement.scrollHeight-innerHeight;for(let i=0;i<360;i++){window.scrollTo(0,max*(i<180?i/180:(360-i)/180));await new Promise(r=>requestAnimationFrame(t=>{deltas.push(t-prev);prev=t;r()}))}return {frames:deltas.length,over50ms:deltas.filter(x=>x>50).length,p95:deltas.sort((a,b)=>a-b)[Math.floor(deltas.length*.95)],longTasks:window.slowTasks}});
console.log(JSON.stringify(result));await browser.close();
