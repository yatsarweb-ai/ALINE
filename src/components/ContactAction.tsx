'use client';
import {useState} from 'react';
import {business,whatsappUrl} from '@/lib/config';
export function ContactAction({message,label='Enviar consulta',className=''}:{message:string;label?:string;className?:string}){
 const [notice,setNotice]=useState(false);
 function send(){const url=whatsappUrl(message);if(url){window.open(url,'_blank','noopener,noreferrer');return}setNotice(true)}
 return <><button type="button" className={className} onClick={send}>{label}</button>{notice&&<div className="contact-notice" role="status"><strong>WhatsApp todavía no está configurado.</strong><p>Podés enviar esta consulta por correo a <a href={`mailto:${business.email}?subject=${encodeURIComponent('Consulta ALINE')}&body=${encodeURIComponent(message)}`}>{business.email}</a>.</p><button onClick={()=>navigator.clipboard.writeText(message)}>Copiar mensaje</button></div>}</>
}
