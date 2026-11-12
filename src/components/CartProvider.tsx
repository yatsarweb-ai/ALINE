'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {findProduct,Product} from '@/lib/products';

type Item={id:string;quantity:number};
type CartContextValue={items:Item[];count:number;subtotal:number;add:(p:Product,q?:number)=>void;setQuantity:(id:string,q:number)=>void;remove:(id:string)=>void};
const Context=createContext<CartContextValue|null>(null);
export function CartProvider({children}:{children:React.ReactNode}){
  const [items,setItems]=useState<Item[]>([]);
  const [ready,setReady]=useState(false);
  useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('aline-cart')||'[]');if(Array.isArray(saved))setItems(saved.filter((x)=>findProduct(x.id)?.price&&Number.isInteger(x.quantity)&&x.quantity>0));}catch{}setReady(true)},[]);
  useEffect(()=>{if(ready)localStorage.setItem('aline-cart',JSON.stringify(items))},[items,ready]);
  const value=useMemo<CartContextValue>(()=>({items,count:items.reduce((s,i)=>s+i.quantity,0),subtotal:items.reduce((s,i)=>s+(findProduct(i.id)?.price||0)*i.quantity,0),add:(p,q=1)=>{if(!p.price)return;setItems(prev=>{const old=prev.find(i=>i.id===p.id);return old?prev.map(i=>i.id===p.id?{...i,quantity:i.quantity+q}:i):[...prev,{id:p.id,quantity:q}]})},setQuantity:(id,q)=>setItems(prev=>q<=0?prev.filter(i=>i.id!==id):prev.map(i=>i.id===id?{...i,quantity:q}:i)),remove:id=>setItems(prev=>prev.filter(i=>i.id!==id))}),[items]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useCart(){const ctx=useContext(Context);if(!ctx)throw new Error('CartProvider missing');return ctx}
