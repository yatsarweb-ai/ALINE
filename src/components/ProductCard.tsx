'use client';
import Image from 'next/image';import Link from 'next/link';
import {Product,money} from '@/lib/products';import {useCart} from './CartProvider';
export function ProductCard({product,feature=false,theme='brown',imageOverride}:{product:Product;feature?:boolean;theme?:'brown'|'mint';imageOverride?:string}){
 const {add}=useCart();
 return <article className={`product-card ${feature?'product-feature':''} ${theme} ${product.category==='Brigadeiros'?'brigadeiro-card':''}`}><Link href={`/producto/${product.id}`} className="product-photo"><Image src={imageOverride||product.image} alt={imageOverride?`Imagen ilustrativa de ${product.name}`:product.name} fill sizes="(max-width: 700px) 80vw, 25vw" /></Link><div className="product-info"><Link href={`/producto/${product.id}`}><h3>{product.name}</h3></Link>{!feature&&product.category==='Brigadeiros'&&<p className="product-description">{product.description}</p>}<p className="product-price">{product.price?money(product.price):product.custom?'Solicitar cotización':'Consultar precio'}</p>{product.price?<button className="pill-button" onClick={()=>add(product)}>Agregar al carrito</button>:<Link className="pill-button" href={`/producto/${product.id}`}>{product.custom?'Solicitar cotización':'Ver detalles'}</Link>}</div></article>
}
