import {chromium} from 'playwright-core';

const baseUrl=process.argv[2]||'http://localhost:3000';
const browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
for(const [name,width,height,isMobile] of [['desktop',1440,900,false],['mobile',390,844,true]]){
 const page=await browser.newPage({viewport:{width,height},isMobile,hasTouch:isMobile,deviceScaleFactor:1,reducedMotion:'reduce'});
 await page.goto(baseUrl,{waitUntil:'networkidle'});
 await page.evaluate(async()=>{
  document.querySelectorAll('img').forEach(image=>{image.loading='eager'});
  await document.fonts.ready;
 });
 const total=await page.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<total;y+=height-100){await page.evaluate(value=>window.scrollTo(0,value),y);await page.waitForTimeout(100)}
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.waitForTimeout(350);
 await page.screenshot({path:`preview-${name}.png`,fullPage:true});
 console.log(name,await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,missingImages:[...document.images].filter(image=>!image.complete||image.naturalWidth===0).length})));
 await page.close();
}
await browser.close();
