'use client';
import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export function useHomeScroll(){
 useEffect(()=>{
  const root=document.querySelector<HTMLElement>('.home-shell');
  if(!root)return;
  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  const originals=new Map<HTMLElement,string>();
  const context=gsap.context(()=>{
   media.add('(prefers-reduced-motion: no-preference)',()=>{
    const mobile=window.innerWidth<=760;
    const amount=mobile?0.45:1;
    root.classList.add('scroll-motion');
    const bind=(target:gsap.TweenTarget,vars:gsap.TweenVars,trigger:Element,start='top bottom',end='bottom top')=>gsap.to(target,{...vars,ease:'none',scrollTrigger:{trigger,start,end,scrub:true,invalidateOnRefresh:true}});
    root.querySelectorAll<HTMLElement>('.hero-piece').forEach((piece,index)=>{
     if(mobile&&piece.classList.contains('piece-five'))return;
     bind(piece,{y:-(18+index*4)*amount,x:(index%2?1:-1)*5*amount},root.querySelector('.hero')!,'top top','bottom top');
    });
    root.querySelectorAll<HTMLElement>('.collections h2,.cake-panel h2,.ideas h2,.event-quote h2').forEach(title=>{
     originals.set(title,title.innerHTML);
     const label=title.innerText.replace(/\s+/g,' ').trim();
     title.setAttribute('aria-label',label);
     const walker=document.createTreeWalker(title,NodeFilter.SHOW_TEXT);
     const nodes:Text[]=[];while(walker.nextNode())nodes.push(walker.currentNode as Text);
     nodes.forEach(node=>{
      const fragment=document.createDocumentFragment();
      (node.textContent||'').split(/(\s+)/).forEach(word=>{
       if(!word.trim()){fragment.append(document.createTextNode(word));return;}
       const group=document.createElement('span');group.style.whiteSpace='nowrap';group.setAttribute('aria-hidden','true');
       Array.from(word).forEach(letter=>{const span=document.createElement('span');span.className='scroll-letter';span.textContent=letter;group.append(span)});
       fragment.append(group);
      });node.replaceWith(fragment);
     });
     gsap.fromTo(title.querySelectorAll('.scroll-letter'),{opacity:.35,y:5},{opacity:1,y:0,stagger:.025,ease:'none',scrollTrigger:{trigger:title,start:'top 95%',end:'top 58%',scrub:true,invalidateOnRefresh:true}});
    });
    root.querySelectorAll('.category-photo img').forEach(image=>bind(image,{y:-6*amount},root.querySelector('.collections')!));
    root.querySelectorAll('.featured-grid .product-card').forEach((card,index)=>bind(card,{y:-(8+index*5)*amount},root.querySelector('.featured-grid')!));
    bind(root.querySelector('.cake-photo img')!,{scale:1.045},root.querySelector('.cake-banner')!);
    root.querySelectorAll('.scrapbook-polaroid').forEach((photo,index)=>bind(photo,{y:(index%2?-5:5)*amount,rotation:index%2?11:-10},root.querySelector('.testimonials')!));
    root.querySelectorAll('.mosaic-cell img,.mosaic-panorama img').forEach(image=>{
     gsap.set(image,{scale:1.045});bind(image,{yPercent:-2},image.parentElement!);
    });
    root.querySelectorAll('.idea-card').forEach((card,index)=>bind(card,{y:-(6+index*4)*amount},root.querySelector('.ideas')!));
    const form=root.querySelector('.event-quote-body')!;
    gsap.fromTo(form,{y:8*amount,opacity:.8},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:form,start:'top 98%',end:'top 85%',scrub:true}});
    gsap.fromTo(root.querySelector('.newsletter-footer'),{y:6,opacity:.8},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:root.querySelector('.newsletter'),start:'top bottom',end:'top 55%',scrub:true}});
    return()=>{root.classList.remove('scroll-motion');originals.forEach((html,title)=>{title.innerHTML=html;title.removeAttribute('aria-label')});originals.clear()};
   });
  },root);
  const refresh=()=>ScrollTrigger.refresh();
  document.fonts.ready.then(refresh);
  root.addEventListener('load',refresh,true);
  return()=>{root.removeEventListener('load',refresh,true);media.revert();context.revert()};
 },[]);
}
