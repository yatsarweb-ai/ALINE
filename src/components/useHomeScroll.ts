'use client';
import {useLayoutEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export function useHomeScroll(){
 useLayoutEffect(()=>{
  const root=document.querySelector<HTMLElement>('.home-shell');if(!root)return;
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browser chrome/keyboard height changes must not re-pin the whole page.
  ScrollTrigger.config({ignoreMobileResize:true});
  const media=gsap.matchMedia();let alive=true;
  const titleStates=new Map<Element,{transform:string;opacity:string}>();
  const context=gsap.context(()=>{
   media.add({desktop:'(min-width:761px)',mobile:'(max-width:760px)',reduce:'(prefers-reduced-motion: reduce)'},match=>{
    if(match.conditions?.reduce)return;
    const mobile=!!match.conditions?.mobile;const strength=mobile?.5:1;
    // Pure 2D transforms avoid forced per-letter GPU surfaces; visual motion is unchanged.
    gsap.set(root.querySelectorAll('.hero-piece,.hero-piece img'),{force3D:false});
    const hero=root.querySelector<HTMLElement>('.hero')!;
    // Freeze the server-painted state before disabling its CSS fallback.
    const titles=root.querySelectorAll<HTMLElement>('h2 .scroll-letter');
    titles.forEach(letter=>{if(!titleStates.has(letter)){const style=getComputedStyle(letter);titleStates.set(letter,{transform:style.transform,opacity:style.opacity})}});
    root.classList.add('scroll-motion');
    const split=(title:HTMLElement)=>title.querySelectorAll('.scroll-letter');
    const reveal=(target:gsap.TweenTarget,from:gsap.TweenVars,to:gsap.TweenVars,trigger:Element,start='top 94%',end='top 42%')=>gsap.fromTo(target,from,{...to,ease:'none',scrollTrigger:{trigger,start,end,scrub:true,invalidateOnRefresh:true}});
    const intro=!root.dataset.introduced;root.dataset.introduced='true';
    if(intro){
     gsap.fromTo(root.querySelectorAll('.hero-piece img'),{yPercent:-280,rotation:i=>i%2?12:-12},{yPercent:0,rotation:0,duration:2,stagger:.055,ease:'power2.out'});
     gsap.fromTo(root.querySelector('.hero .header-logo'),{opacity:.3,scale:.94},{opacity:1,scale:1,duration:1.5,delay:.3,ease:'power2.out'});
    }
    const heroSequence=gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:()=>`+=${document.documentElement.clientHeight*(mobile?.28:.55)}`,pin:true,scrub:true,invalidateOnRefresh:true}});
    root.querySelectorAll('.hero-piece').forEach((piece,index)=>heroSequence.to(piece,{x:(index%2?1:-1)*42*strength,y:-36*strength,scale:index%3===0?1.15:.9,rotation:(index%2?1:-1)*7*strength,ease:'none'},0));
    heroSequence.to(root.querySelector('.hero-copy'),{scale:.96,y:-18*strength,force3D:false,ease:'none'},0);
    root.querySelectorAll<HTMLElement>('.collections h2,.cake-panel h2,.ideas h2,.event-quote h2,.testimonial-heading h2,.newsletter h2').forEach(title=>gsap.fromTo(split(title),{transform:(_i,letter)=>titleStates.get(letter)?.transform||'none',opacity:(_i,letter)=>Number(titleStates.get(letter)?.opacity??1)},{transform:'translate(0px,0px) rotate(0deg)',force3D:false,opacity:1,stagger:{amount:.3},ease:'none',scrollTrigger:{trigger:title,start:'top 94%',end:'top 42%',scrub:true}}));
    root.querySelectorAll('.featured-grid .product-card').forEach((card,index)=>reveal(card,{y:(38+index*22)*strength,rotation:(index-1)*3*strength},{y:0,rotation:0},root.querySelector('.featured-grid')!));
    reveal(root.querySelector('.cake-photo img')!,{scale:1.13},{scale:1},root.querySelector('.cake-banner')!);
    reveal(root.querySelector('.review-window')!,{y:-48*strength,rotation:-2*strength},{y:0,rotation:0},root.querySelector('.testimonials')!);
    root.querySelectorAll('.scrapbook-polaroid').forEach((photo,index)=>reveal(photo,{y:-(20+index%2*18)*strength,rotation:index%2?15:-15},{y:0,rotation:index%2?9:-8},root.querySelector('.testimonials')!));
    root.querySelectorAll<HTMLElement>('.idea-card').forEach((card,index)=>reveal(card,{x:()=>{const parent=card.parentElement!;return (parent.clientWidth/2-card.offsetLeft-card.offsetWidth/2)*.35},y:38*strength,rotation:(index-1)*6*strength,scale:.96},{x:0,y:0,rotation:0,scale:1},root.querySelector('.ideas')!));
    const form=root.querySelector<HTMLElement>('.event-quote-body')!;
    const formTween=reveal(form,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)'},form,'top 96%','top 70%');
    const stable=()=>{formTween.scrollTrigger?.kill();formTween.progress(1)};form.addEventListener('focusin',stable);
    reveal(root.querySelector('.newsletter-footer img')!,{scale:.9,opacity:.4},{scale:1,opacity:1},root.querySelector('.newsletter')!);
    reveal(root.querySelectorAll('.newsletter-footer a'),{y:12,opacity:.4},{y:0,opacity:1,stagger:.1},root.querySelector('.newsletter')!);
    return()=>{form.removeEventListener('focusin',stable);root.classList.remove('scroll-motion')};
   });
  },root);
  let frame=0;const refresh=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(alive)ScrollTrigger.refresh()})};
  // Image containers reserve their dimensions. Lazy image loads cannot change layout.
  // Refresh once for font metrics, never for every image while the user scrolls.
  document.fonts.ready.then(refresh);
  return()=>{alive=false;cancelAnimationFrame(frame);media.revert();context.revert()};
 },[]);
}
