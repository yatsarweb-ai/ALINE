export type Category = 'Brigadeiros' | 'Chocolates y fresas' | 'Tortas' | 'Postres' | 'Regalos';
export type Product = {id:string;name:string;description:string;category:Category;image:string;price?:number;custom?:boolean;seasonal?:boolean;variants?:string[]};
export const categories: Category[] = ['Brigadeiros','Chocolates y fresas','Tortas','Postres','Regalos'];
export const products: Product[] = [
  {id:'tradicional',name:'Brigadeiro tradicional de chocolate',description:'Con lluvia de chocolate.',category:'Brigadeiros',image:'/images/brigadeiro-tradicional-clean.png',price:2},
  {id:'crispy',name:'Brigadeiro crispy importado',description:'Cereal blanco y negro.',category:'Brigadeiros',image:'/images/brigadeiro-crispy-clean.png',price:2},
  {id:'callebaut-dark',name:'Brigadeiro Callebaut dark',description:'Crispy importado de chocolate belga oscuro.',category:'Brigadeiros',image:'/images/brigadeiro-dark-clean.png',price:2.5},
  {id:'callebaut-blanco',name:'Brigadeiro Callebaut blanco',description:'Crispy importado de chocolate belga blanco.',category:'Brigadeiros',image:'/images/brigadeiro-blanco-clean.png',price:2.5},
  {id:'callebaut-milk',name:'Brigadeiro Callebaut milk',description:'Crispy importado de chocolate belga con leche.',category:'Brigadeiros',image:'/images/brigadeiro-milk-clean.png',price:2.5},
  {id:'callebaut-caramel',name:'Brigadeiro Callebaut salted caramel',description:'Crispy importado de chocolate belga salted caramel.',category:'Brigadeiros',image:'/images/brigadeiro-caramel-clean.png',price:2.5},
  {id:'galak',name:'Brigadeiro Galak',description:'Con crispy blanco.',category:'Brigadeiros',image:'/images/brigadeiro-galak-clean.png',price:2},
  {id:'caja-cuatro',name:'Caja de 4 brigadeiros decorados',description:'Presentación especial del catálogo Día de las Madres 2026.',category:'Regalos',image:'/images/gift-four.jpg',seasonal:true},
  {id:'corazon-siete',name:'Corazón de 7 brigadeiros',description:'Caja con forma de corazón y brigadeiros decorados.',category:'Regalos',image:'/images/gift-heart.jpg',seasonal:true},
  {id:'blister',name:'Blíster de 1 brigadeiro',description:'Presentación en formato tarjeta.',category:'Regalos',image:'/images/gift-single.jpg',seasonal:true},
  {id:'cajitas-brigadeiros',name:'Cajitas de brigadeiros',description:'Presentaciones de 4, 9 o 16 brigadeiros.',category:'Regalos',image:'/images/gift-boxes.jpg',seasonal:true,variants:['4 unidades','9 unidades','16 unidades']},
  {id:'trio-tabletas',name:'Trío de tabletas rellenas',description:'Chocolate bitter con rellenos de pie de limón, brigadeiro de pistacho con brownie y brigadeiro de chocolate con vainilla.',category:'Chocolates y fresas',image:'/images/chocolate-tablets.jpg',seasonal:true},
  {id:'corazon-chocolate',name:'Corazón de chocolate con fresas',description:'Caja en forma de corazón con 6 fresas rellenas de chocolate.',category:'Chocolates y fresas',image:'/images/strawberry-heart.jpg',seasonal:true},
  {id:'jardin-rosas',name:'Jardín de rosas y fresas',description:'Corazón con fresas, brownies, mini galletas, mini brigadeiros y crema de brigadeiro para untar.',category:'Regalos',image:'/images/gift-roses.jpg',seasonal:true},
  {id:'cajitas-fresas',name:'Cajitas de fresas',description:'Presentaciones de 2, 6 o 12 fresas.',category:'Chocolates y fresas',image:'/images/strawberry-boxes.jpg',seasonal:true,variants:['2 fresas','6 fresas','12 fresas']},
  {id:'corazon-compartir',name:'Corazón para compartir',description:'Fresas, brownies, mini galletas, mini brigadeiros y crema de brigadeiro para untar.',category:'Postres',image:'/images/gift-share.jpg',seasonal:true},
  {id:'pequenos-detalles',name:'Box pequeños detalles',description:'Caja mixta con flaquito, blíster y cajita de 4 brigadeiros.',category:'Regalos',image:'/images/gift-details.jpg',seasonal:true},
  {id:'piramide-top',name:'Pirámide Top',description:'Mini torta para 4 personas, 12 fresas con chocolate y 16 brigadeiros decorados.',category:'Regalos',image:'/images/gift-pyramid.jpg',seasonal:true},
  {id:'cake-gourmet',name:'Box cake gourmet',description:'Arreglo floral con torta rellena para 6 personas.',category:'Tortas',image:'/images/cake-floral.jpg',seasonal:true},
  {id:'dubai',name:'Tableta de chocolate Dubai',description:'Chocolate de leche tradicional relleno de pistacho.',category:'Chocolates y fresas',image:'/images/dubai-chocolate.jpg',seasonal:true},
];
export const findProduct = (id:string) => products.find(p=>p.id===id);
export const money = (value:number) => `$${value.toFixed(2)}`;


