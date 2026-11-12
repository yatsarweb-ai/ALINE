import {webkit} from 'playwright-core';

const url=process.argv[2]||'http://localhost:3000';
const label=process.argv[3]||'webkit-hero';
const browser=await webkit.launch({headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true});
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
await page.goto(url,{waitUntil:'networkidle'});
await page.locator('.hero').screenshot({path:`${label}.png`});
if(process.argv[4]==='frames'){
 for(let second=1;second<=7;second++){
  await page.waitForTimeout(1000);
  await page.locator('.hero').screenshot({path:`${label}-${second}.png`});
 }
}
const details=await page.locator('.hero').evaluate(hero=>({
 width:innerWidth,
 scrollWidth:document.documentElement.scrollWidth,
 pieces:[...hero.querySelectorAll('.hero-piece')].map(piece=>({className:piece.className,filter:getComputedStyle(piece).filter,rect:piece.getBoundingClientRect().toJSON()})),
 roseAnimation:getComputedStyle(hero.querySelector('.piece-five')).animationName,
 images:[...hero.querySelectorAll('img')].map(image=>({src:image.currentSrc,loaded:image.complete&&image.naturalWidth>0})),
}));
if(errors.length)throw new Error(errors.join('; '));
if(process.argv[4]==='assert-fixed'){
 const rose=details.pieces.find(piece=>piece.className.includes('piece-five'));
 if(rose.filter!=='none'||details.roseAnimation!=='none')throw new Error('El bombón rosado aún usa composición filtrada o animada en móvil');
 if(details.width!==390||details.scrollWidth!==390||details.images.some(image=>!image.loaded))throw new Error('Hero móvil incompleto o con desbordamiento');
}
console.log(JSON.stringify(details));
await browser.close();
