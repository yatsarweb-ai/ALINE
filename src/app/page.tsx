'use client';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight,Instagram} from 'lucide-react';
import {useRef,useState} from 'react';
import {useHomeScroll} from '@/components/useHomeScroll';

import {SiteHeader} from '@/components/SiteHeader';
import {ProductCard} from '@/components/ProductCard';
import {QuoteForm} from '@/components/QuoteForm';
import {CategoryMarquee} from '@/components/CategoryMarquee';
import {MultimediaGallery} from '@/components/MultimediaGallery';
import {ReviewCarousel} from '@/components/ReviewCarousel';
import {products} from '@/lib/products';
import {business} from '@/lib/config';

export default function Home(){
 const hero=useRef<HTMLElement>(null);
 const [email,setEmail]=useState('');
 useHomeScroll();
 const featured=[products[0],products[2],products[6]];
 const featuredImages=['/images/generated/featured-traditional.png','/images/generated/featured-dark-crispy.png','/images/generated/featured-galak.png'];
 return <main className="home-shell"><div className="home-grid"><div className="left-column">
  <section className="hero" ref={hero}><div className="hero-photos" aria-hidden="true"><div className="hero-piece piece-one"><Image src="/images/generated/hero-dark-v2.webp" alt="" fill sizes="300px" priority/></div><div className="hero-piece piece-two"><Image src="/images/generated/hero-white-v2.webp" alt="" fill sizes="260px" priority/></div><div className="hero-piece piece-three"><Image src="/images/generated/hero-pistachio-v2.webp" alt="" fill sizes="210px"/></div><div className="hero-piece piece-four"><Image src="/images/generated/hero-cocoa-v2.webp" alt="" fill sizes="230px"/></div><div className="hero-piece piece-five"><Image src="/images/generated/hero-rose.png" alt="" fill sizes="170px"/></div><div className="hero-piece piece-six"><Image src="/images/generated/hero-caramel.png" alt="" fill sizes="170px"/></div><div className="hero-piece piece-seven"><Image src="/images/generated/hero-cake-slice.png" alt="" fill sizes="230px"/></div><div className="hero-piece piece-eight"><Image src="/images/generated/hero-macarons.png" alt="" fill sizes="210px"/></div></div><SiteHeader home/><div className="hero-copy"><h1 className="hero-enter"><span>CADA CELEBRACIÓN</span><span className="title-final">MERECE ALGO <em>ÚNICO</em></span></h1><p className="hero-enter">Brigadeiros, chocolates, tortas y creaciones personalizadas para tus momentos especiales.</p><Link className="pill-button hero-enter" href="/colecciones">Explorar creaciones <ArrowRight size={18}/></Link></div><svg className="hero-wave" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 48 C125 12 250 12 370 44 C500 80 608 78 735 44 C875 8 1030 12 1200 50 L1200 90 L0 90 Z" fill="#F7F5F0"/></svg></section>
  <section className="collections home-section"><span className="eyebrow">CATEGORÍAS</span><h2>NUESTRAS<br/>COLECCIONES</h2><CategoryMarquee/><div className="featured-grid">{featured.map((product,index)=><ProductCard key={product.id} product={product} feature theme={index===1?'mint':'brown'} imageOverride={featuredImages[index]}/>)}</div><Link className="all-products-link" href="/colecciones">Ver todos los productos <ArrowRight size={18}/></Link></section>
  <section className="cake-banner"><div className="cake-photo"><Image src="/images/cake-floral.jpg" alt="Torta decorada de ALINE" fill sizes="(max-width:700px) 50vw, 50vw"/></div><div className="cake-panel"><span className="eyebrow">TORTAS GOURMET</span><h2>TORTAS<br/>PARA CELEBRAR</h2><p>Sabores irresistibles y diseños especiales para tus ocasiones más importantes.</p><Link className="pill-button dark" href="/colecciones?categoria=Tortas">Ver tortas <ArrowRight size={18}/></Link></div></section>
  <section className="testimonials home-section"><div className="testimonial-heading"><span className="eyebrow">TESTIMONIOS</span><h2>LO QUE DICEN<br/>NUESTROS CLIENTES</h2></div><ReviewCarousel/></section>
 </div><div className="right-column">
  <MultimediaGallery/>
  <section className="event-quote home-section"><span className="eyebrow">¡TU EVENTO!</span><h2>COTIZÁ<br/>TU CELEBRACIÓN</h2><div className="event-quote-body"><QuoteForm compact/></div></section>
  <section className="ideas home-section"><h2>IDEAS PARA<br/>TU EVENTO</h2><div className="idea-grid">{[['Bodas','/images/gift-roses.jpg'],['Cumpleaños','/images/minnie-brigadeiros.jpg'],['Eventos corporativos','/images/chocolate-tablets.jpg']].map(([title,src])=><Link href={`/personalizados?inspiracion=${encodeURIComponent(title)}`} className="idea-card" key={title}><div><Image src={src} alt={title} fill sizes="(max-width:700px) 30vw, 30vw"/></div><span>{title} <ArrowRight size={17}/></span></Link>)}</div></section>
  <section className="newsletter"><span className="eyebrow">SÉ LA PRIMERA</span><h2>CONOCÉ NUESTRAS<br/>NOVEDADES</h2><p>Recibí lanzamientos, colecciones especiales y novedades de ALINE.</p><form onSubmit={event=>{event.preventDefault();window.location.href=`mailto:${business.email}?subject=${encodeURIComponent('Novedades ALINE')}&body=${encodeURIComponent(`Hola ALINE, quisiera recibir novedades en ${email}.`)}`}}><label className="sr-only" htmlFor="news-email">Tu correo electrónico</label><input id="news-email" type="email" required placeholder="Tu correo electrónico" value={email} onChange={event=>setEmail(event.target.value)}/><button aria-label="Solicitar novedades por correo"><ArrowRight size={20}/></button></form><div className="newsletter-footer"><Image src="/images/aline-logo-white.png" alt="ALINE — Brigadería Gourmet" width={150} height={105}/><span className="footer-divider"/><a href={business.instagram} target="_blank" rel="noreferrer" aria-label="Instagram de ALINE"><Instagram/></a><a href={`mailto:${business.email}`} aria-label="Correo de ALINE">@</a></div></section>
 </div></div></main>
}
