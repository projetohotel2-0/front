import Header from '../../components/header/index';
import style from './style.module.css';


const products = [
    {
      id: 1,
      name: 'Cadastro de lanches',
      href: '/cad_lanche',
      imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
     
    },
    {
        id: 2,
        name: 'Lista de lanches',
        href: '/manage_lanch/lista',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$36',
       
      },
      {
        id: 3,
        name: 'Lanches mais vendidos',
        href: '#',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$36',
      
      },
      {
        id: 4,
        name: 'Lanches excluídos',
        href: '/manage_lanch/excluidos',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$36',
      
      },
    // More products...
  ]



export default function MenuManageLanch(){
    return (
        <div>
            <Header/>
            <div className={style.divFundoManageLanch}>
                <div className={style.bannerMenuLanch}>
                    <p>Atenção! você poderá Criar, Editar ou Excluir todo ítem relacionado a categoria lanche. 
                        Bem como resgatá-lo posteriomente na opção "lanches excluídos"
                    </p>
                </div>
                {/* <h2>Cadastrar lanches</h2>
                <h2>Listar lanches</h2>
                <h2>Lanches excluidos</h2>
                <h2>Mais vendidos</h2> */}



                <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">O que deseja acessar?</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                {/* <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

            </div>
        
        </div>
    )
}