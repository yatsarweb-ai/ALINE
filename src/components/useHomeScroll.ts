'use client';
import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export function useHomeScroll(){
 useEffect(()=>{
  const root=document.querySelector<HTMLElement>('.home-shell');if(!root)return;
  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();let alive=true;
  const context=gsap.context(()=>{
   media.add({desktop:'(min-width:761px)',mobile:'(max-width:760px)',reduce:'(prefers-reduced-motion: reduce)'},match=>{
    if(match.conditions?.reduce)return;
    const mobile=!!match.conditions?.mobile;const strength=mobile?.5:1;
    const originals=new Map<HTMLElement,string>();
    root.classList.add('scroll-motion');
    const hero=root.querySelector<HTMLElement>('.hero')!;
    const split=(title:HTMLElement)=>{
     originals.set(title,title.innerHTML);title.setAttribute('aria-label',title.innerText.replace(/\s+/g,' ').trim());
     const walker=document.createTreeWalker(title,NodeFilter.SHOW_TEXT);const nodes:Text[]=[];
     while(walker.nextNode())nodes.push(walker.currentNode as Text);
     nodes.forEach(node=>{const fragment=document.createDocumentFragment();(node.textContent||'').split(/(\s+)/).forEach(word=>{
      if(!word.trim()){fragment.append(document.createTextNode(word));return;}
      const group=document.createElement('span');group.style.whiteSpace='nowrap';group.setAttribute('aria-hidden','true');
      Array.from(word).forEach(letter=>{const span=document.createElement('span');span.className='scroll-letter';span.textContent=letter;group.append(span)});fragment.append(group);
     });node.replaceWith(fragment)});return title.querySelectorAll('.scroll-letter');
    };
    const reveal=(target:gsap.TweenTarget,from:gsap.TweenVars,to:gsap.TweenVars,trigger:Element,start='top 94%',end='top 48%')=>gsap.fromTo(target,from,{...to,ease:'none',scrollTrigger:{trigger,start,end,scrub:.18,invalidateOnRefresh:true}});
    const intro=!root.dataset.introduced;root.dataset.introduced='true';
    if(intro){
     gsap.fromTo(root.querySelectorAll('.hero-piece img'),{yPercent:-280,rotation:i=>i%2?12:-12},{yPercent:0,rotation:0,duration:2,stagger:.055,ease:'power2.out'});
     gsap.fromTo(root.querySelector('.hero .header-logo'),{opacity:.3,scale:.94},{opacity:1,scale:1,duration:1.5,delay:.3,ease:'power2.out'});
    }
    const heroLetters=split(root.querySelector<HTMLElement>('.hero h1')!);
    if(intro)gsap.fromTo(heroLetters,{y:i=>i%2?12:-8,rotation:i=>i%2?3:-3,opacity:.3},{y:0,rotation:0,opacity:1,duration:1.2,stagger:.025,delay:.25,ease:'power2.out'});
    const heroSequence=gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:()=>`+=${innerHeight*(mobile?.28:.55)}`,pin:true,scrub:.18,invalidateOnRefresh:true}});
    root.querySelectorAll('.hero-piece').forEach((piece,index)=>heroSequence.to(piece,{x:(index%2?1:-1)*30*strength,y:-25*strength,scale:index%3===0?1.12:.92,rotation:(index%2?1:-1)*7*strength,ease:'none'},0));
    heroSequence.to(root.querySelector('.hero-copy'),{scale:.96,y:-12*strength,ease:'none'},0);
    root.querySelectorAll<HTMLElement>('.collections h2,.cake-panel h2,.ideas h2,.event-quote h2,.testimonial-heading h2,.newsletter h2').forEach(title=>reveal(split(title),{y:i=>(i%3+1)*6*strength,rotation:i=>i%2?4:-4,opacity:.3},{y:0,rotation:0,opacity:1,stagger:.025},title));
    root.querySelectorAll('.featured-grid .product-card').forEach((card,index)=>reveal(card,{y:(25+index*18)*strength,rotation:(index-1)*3*strength},{y:0,rotation:0},root.querySelector('.featured-grid')!));
    reveal(root.querySelector('.cake-photo img')!,{scale:1.09},{scale:1},root.querySelector('.cake-banner')!);
    reveal(root.querySelector('.review-window')!,{y:-35*strength,rotation:-2*strength},{y:0,rotation:0},root.querySelector('.testimonials')!);
    root.querySelectorAll('.scrapbook-polaroid').forEach((photo,index)=>reveal(photo,{y:-(20+index%2*18)*strength,rotation:index%2?15:-15},{y:0,rotation:index%2?9:-8},root.querySelector('.testimonials')!));
    root.querySelectorAll('.mosaic-cell,.mosaic-panorama').forEach(cell=>reveal(cell,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)'},cell,'top 98%','top 45%'));
    root.querySelectorAll<HTMLElement>('.idea-card').forEach((card,index)=>reveal(card,{x:()=>{const parent=card.parentElement!;return (parent.clientWidth/2-card.offsetLeft-card.offsetWidth/2)*.35},y:25*strength,rotation:(index-1)*6*strength,scale:.96},{x:0,y:0,rotation:0,scale:1},root.querySelector('.ideas')!));
    const form=root.querySelector<HTMLElement>('.event-quote-body')!;
    const formTween=reveal(form,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)'},form,'top 98%','top 88%');
    const stable=()=>{formTween.scrollTrigger?.kill();formTween.progress(1)};form.addEventListener('focusin',stable);
    reveal(root.querySelector('.newsletter-footer img')!,{scale:.9,opacity:.4},{scale:1,opacity:1},root.querySelector('.newsletter')!);
    reveal(root.querySelectorAll('.newsletter-footer a'),{y:12,opacity:.4},{y:0,opacity:1,stagger:.1},root.querySelector('.newsletter')!);
    return()=>{form.removeEventListener('focusin',stable);root.classList.remove('scroll-motion');originals.forEach((html,title)=>{title.innerHTML=html;title.removeAttribute('aria-label')})};
   });
  },root);
  let frame=0;const refresh=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(alive)ScrollTrigger.refresh()})};
  document.fonts.ready.then(refresh);root.addEventListener('load',refresh,true);
  return()=>{alive=false;cancelAnimationFrame(frame);root.removeEventListener('load',refresh,true);media.revert();context.revert()};
 },[]);
}
