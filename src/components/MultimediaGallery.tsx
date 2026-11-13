'use client';

import Image from 'next/image';
import {useEffect, useRef} from 'react';

const pieces = [
 {area:'a', video:'DekkUdDhwea', alt:'Texturas y rellenos de los dulces de ALINE'},
 {area:'b', image:'/images/citrus-brigadeiros.jpg', alt:'Brigadeiros decorados con cítricos'},
 {area:'c', video:'Dexrd0At-dE', alt:'Torta decorada con chocolates y crema'},
 {area:'d', image:'/images/gift-four.jpg', alt:'Caja de cuatro dulces para regalar'},
 {area:'e', image:'/media/chocolate-cake.webp', alt:'Porción de torta de chocolate con brigadeiros'},
 {area:'f', image:'/images/gift-share.jpg', alt:'Selección de dulces para compartir'},
 {area:'g', image:'/images/strawberry-heart.jpg', alt:'Fresas y chocolates en presentación de corazón'},
 {area:'h', video:'Db8qHrsJBYN', alt:'Tortas de chocolate y sus porciones'},
];

export function MultimediaGallery(){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  const gallery=root.current;if(!gallery)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const animations=new Set<Animation>();
  const visible=new Set<HTMLVideoElement>();
  let disposed=false;
  const syncVideo=(video:HTMLVideoElement)=>{
   if(disposed||reduced.matches||document.hidden||!visible.has(video)){video.pause();return;}
   if(!video.getAttribute('src')){video.src=video.dataset.src!;video.load();}
   video.play().then(()=>{if(disposed||reduced.matches||document.hidden||!visible.has(video))video.pause();}).catch(()=>{/* Poster remains available when autoplay is blocked. */});
  };
  const sync=()=>{
   if(reduced.matches)animations.forEach(animation=>animation.finish());
   gallery.querySelectorAll('video').forEach(syncVideo);
  };
  const entries=new IntersectionObserver(records=>records.forEach(record=>{
   if(!record.isIntersecting)return;
   const element=record.target as HTMLElement;
   entries.unobserve(element);
   element.dataset.entered='true';
   // Start from a visible baseline: unsupported/disabled JS never hides content.
   if(!reduced.matches){
    const animation=element.animate([{opacity:.35,transform:'translateY(20px) scale(.985)'},{opacity:1,transform:'none'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'});
    animations.add(animation);animation.onfinish=()=>animations.delete(animation);
   }
  }),{threshold:.08});
  const playback=new IntersectionObserver(records=>records.forEach(record=>{
   const video=record.target as HTMLVideoElement;
   if(record.isIntersecting&&record.intersectionRatio>=.15)visible.add(video);else visible.delete(video);
   syncVideo(video);
  }),{threshold:[0,.15]});
  gallery.querySelectorAll('.media-piece').forEach(element=>entries.observe(element));
  gallery.querySelectorAll('video').forEach(video=>playback.observe(video));
  reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  return()=>{disposed=true;entries.disconnect();playback.disconnect();animations.forEach(a=>a.cancel());gallery.querySelectorAll('video').forEach(v=>v.pause());reduced.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);};
 },[]);
 return <section ref={root} className="photo-mosaic multimedia-gallery" aria-label="Galería de creaciones ALINE">
  <div className="editorial-grid">{pieces.map(piece=><figure className={`media-piece media-${piece.area}`} key={piece.area}>
   {piece.video?<video data-src={`/media/${piece.video}.mp4`} poster={`/media/${piece.video}.jpg`} muted autoPlay loop playsInline preload="none" aria-label={piece.alt}/>:<Image src={piece.image!} alt={piece.alt} fill sizes="(max-width:760px) 66vw, 560px"/>}
  </figure>)}</div>
 </section>;
}
