'use client';
import Image from 'next/image';
import {ArrowLeft,ArrowRight,Star} from 'lucide-react';
import {useEffect,useRef,useState} from 'react';

const reviews=[
 {text:'Los brigadeiros personalizados hicieron que nuestra celebración se sintiera aún más especial.',photos:['/images/minnie-brigadeiros.jpg','/images/citrus-brigadeiros.jpg']},
 {text:'La presentación de los chocolates fue preciosa y acompañó muy bien nuestra fiesta.',photos:['/images/chocolate-tablets.jpg','/images/gift-four.jpg']},
 {text:'Nos encantó poder elegir una temática para los dulces de la celebración.',photos:['/images/gift-heart.jpg','/images/strawberry-heart.jpg']},
];
const slides=[reviews[reviews.length-1],...reviews,reviews[0]];

export function ReviewCarousel(){
 const [position,setPosition]=useState(1);
 const [animate,setAnimate]=useState(true);
 const [paused,setPaused]=useState(false);
 const touchX=useRef(0);
 const reduceMotion=useRef(false);
 useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');reduceMotion.current=query.matches;const update=()=>{reduceMotion.current=query.matches};query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[]);
 useEffect(()=>{if(paused)return;const timer=window.setTimeout(()=>setPosition(value=>reduceMotion.current&&value===reviews.length?1:value+1),8000);return()=>window.clearTimeout(timer)},[position,paused]);
 const move=(direction:number)=>{setAnimate(true);setPosition(value=>{const next=Math.max(0,Math.min(reviews.length+1,value+direction));return reduceMotion.current?(next===0?reviews.length:next===reviews.length+1?1:next):next})};
 const settle=()=>{if(position===0||position===reviews.length+1){setAnimate(false);setPosition(position===0?reviews.length:1);requestAnimationFrame(()=>requestAnimationFrame(()=>setAnimate(true)))}};
 return <div className="testimonial-slider" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setPaused(false)}} onTouchStart={event=>{touchX.current=event.touches[0].clientX;setPaused(true)}} onTouchEnd={event=>{const delta=event.changedTouches[0].clientX-touchX.current;if(Math.abs(delta)>35)move(delta<0?1:-1);setPaused(false)}}>
  <button className="circle-arrow testimonial-arrow" type="button" onClick={()=>move(-1)} aria-label="Reseña anterior"><ArrowLeft size={18}/></button>
  <div className="review-window" aria-live="polite"><div className="review-track" style={{transform:`translateX(-${position*100}%)`,transition:animate&&!reduceMotion.current?'transform 460ms cubic-bezier(0.77, 0, 0.175, 1)':'none'}} onTransitionEnd={event=>{if(event.target===event.currentTarget)settle()}}>
   {slides.map((review,index)=><article className="testimonial-card scrapbook-card" key={`${index}-${review.text}`} aria-hidden={index!==position}>
    <div className="scrapbook-photos" aria-hidden="true">{review.photos.map((src,photoIndex)=><div className={`scrapbook-polaroid polaroid-${photoIndex+1}`} key={src}><div><Image src={src} alt="" fill sizes="140px"/></div></div>)}</div>
    <div className="testimonial-content"><span className="scrapbook-kicker">ALINE · MOMENTOS DULCES</span><div className="quote-mark" aria-hidden="true">“</div><p>“{review.text}”</p><div className="review-stars" aria-label="Cinco estrellas de ejemplo">{Array.from({length:5},(_,i)=><Star key={i} size={17} fill="currentColor"/>)}</div><small>Reseña demostrativa · valoración de ejemplo no verificada</small></div>
   </article>)}
  </div></div>
  <button className="circle-arrow testimonial-arrow" type="button" onClick={()=>move(1)} aria-label="Reseña siguiente"><ArrowRight size={18}/></button>
 </div>
}
