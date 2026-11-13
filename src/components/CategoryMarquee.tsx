'use client';

import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft,ArrowRight} from 'lucide-react';
import {useEffect,useRef} from 'react';
import {categories,Category} from '@/lib/products';

const images:Record<Category,string>={
 Brigadeiros:'/images/generated/category-brigadeiros-v2.webp',
 'Chocolates y fresas':'/images/generated/category-chocolates-v2.webp',
 Tortas:'/images/generated/category-cake-v2.webp',
 Postres:'/images/generated/category-desserts-v2.webp',
 Regalos:'/images/generated/category-gifts-v2.webp',
};

export function CategoryMarquee(){
 const viewport=useRef<HTMLDivElement>(null);
 const group=useRef<HTMLDivElement>(null);
 const paused=useRef(false);
 const holdUntil=useRef(0);
 const groupWidth=useRef(0);
 const position=useRef(0);

 useEffect(()=>{
  const scroller=viewport.current;
  const firstGroup=group.current;
  if(!scroller||!firstGroup)return;
  const measure=()=>{const previous=groupWidth.current;groupWidth.current=firstGroup.getBoundingClientRect().width;if(!previous&&groupWidth.current){position.current=groupWidth.current;scroller.scrollLeft=position.current}};
  const observer=new ResizeObserver(measure);
  observer.observe(firstGroup);
  measure();
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;let last=performance.now();let onScreen=false;
  const active=()=>onScreen&&!document.hidden&&!reduced.matches;
  const advance=(now:number)=>{
   frame=0;if(!active())return;
   const elapsed=Math.min(50,now-last);last=now;
   if(!reduced.matches&&!paused.current&&now>holdUntil.current&&groupWidth.current){
    position.current+=elapsed*.018;
    if(position.current>=groupWidth.current*2)position.current-=groupWidth.current;
    if(position.current<groupWidth.current*.5)position.current+=groupWidth.current;
    scroller.scrollLeft=position.current;
   }else{
    position.current=scroller.scrollLeft;
   }
   frame=requestAnimationFrame(advance);
  };
  const sync=()=>{cancelAnimationFrame(frame);frame=0;if(active()){last=performance.now();position.current=scroller.scrollLeft;frame=requestAnimationFrame(advance)}};
  const visibility=new IntersectionObserver(entries=>{onScreen=entries[0].isIntersecting;sync()});
  visibility.observe(scroller);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync)};
 },[]);

 const move=(direction:number)=>{
  const scroller=viewport.current;
  const tile=group.current?.querySelector<HTMLElement>('.category-tile');
  if(!scroller||!tile)return;
  holdUntil.current=performance.now()+950;
  scroller.scrollBy({left:direction*(tile.getBoundingClientRect().width+14),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 };

 return <div className="category-carousel">
  <button className="circle-arrow" onClick={()=>move(-1)} aria-label="Categorías anteriores"><ArrowLeft size={18}/></button>
  <div className="category-viewport" ref={viewport} onMouseEnter={()=>paused.current=true} onMouseLeave={()=>paused.current=false} onPointerDown={()=>{paused.current=true;holdUntil.current=performance.now()+1600}} onPointerUp={()=>{paused.current=false;holdUntil.current=performance.now()+1600}} onPointerCancel={()=>paused.current=false}>
   <div className="category-marquee-track">{[0,1,2].map(copy=><div className="category-group" ref={copy===0?group:undefined} key={copy} aria-hidden={copy!==1}>{categories.map(category=><Link className="category-tile" key={category} href={`/colecciones?categoria=${encodeURIComponent(category)}`} tabIndex={copy===1?0:-1}><div className="category-photo"><Image src={images[category]} alt="" fill sizes="(max-width:700px) 150px, 190px"/></div><span>{category}</span></Link>)}</div>)}</div>
  </div>
  <button className="circle-arrow" onClick={()=>move(1)} aria-label="Categorías siguientes"><ArrowRight size={18}/></button>
 </div>
}
