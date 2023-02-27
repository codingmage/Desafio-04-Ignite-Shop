import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/src/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { stripe } from '../../lib/stripe'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string
    quantity: number
  }
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  /* na maioria das vezes o estado de loading (skeleton page) é o recomendado:  */
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  /*   const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false) */

  function handleBuyproduct() {
    addItem({
      name: product.name,
      id: product.id,
      price: product.price,
      currency: 'BRL',
      image: product.imageUrl,
      price_id: product.defaultPriceId,
    })
  }
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {formatCurrencyString({ value: product.price, currency: 'BRL' })}
          </span>

          <p>{product.description}</p>
          <button onClick={handleBuyproduct}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // buscar os produtos mais acessados/vendidos
  // fallback true é mais comum

  return {
    paths: [
      {
        params: { id: 'prod_NMbFUmbhTpfkkc' },
      },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id
  /* Forma alternativa:  
  export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params.id) */

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
