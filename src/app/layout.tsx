import type {Metadata} from 'next';
import './globals.css';
import './home-overrides.css';
import './premium-refinements.css';
import './final-corrections.css';
import {CartProvider} from '@/components/CartProvider';

export const metadata: Metadata = {title:'ALINE — Brigadería Gourmet',description:'Brigadeiros, chocolates, tortas y creaciones personalizadas en Caracas, Venezuela.'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="es"><body><CartProvider>{children}</CartProvider></body></html>; }
