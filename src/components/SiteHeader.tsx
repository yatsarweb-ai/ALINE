'use client';
import Image from 'next/image';
import Link from 'next/link';
import {Menu,ShoppingCart,X} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {useCart} from './CartProvider';
const links=[['Inicio','/'],['Colecciones','/colecciones'],['Personalizados','/personalizados'],['Eventos','/eventos'],['Nosotros','/nosotros']];
export function SiteHeader({home=false}:{home?:boolean}){
 const [open,setOpen]=useState(false);const {count}=useCart();const pathname=usePathname();
 return <header className={`site-header ${home?'home-header':''}`}><Link href="/" className="header-logo" aria-label="ALINE, inicio"><Image src="/images/aline-logo-white.png" alt="ALINE — Brigadería Gourmet" width={270} height={190} priority /></Link><div className="header-row"><nav className={open?'nav-links is-open':'nav-links'} aria-label="Navegación principal">{links.map(([label,href])=><Link className={pathname===href?'active':''} onClick={()=>setOpen(false)} href={href} key={href}>{label}</Link>)}</nav><Link href="/carrito" key={count} className="cart-link" aria-label={`Carrito con ${count} productos`}><ShoppingCart size={19}/>{count>0&&<span className="cart-count">{count}</span>}</Link><button type="button" className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Cerrar menú':'Abrir menú'}>{open?<X/>:<Menu/>}</button></div></header>
}


