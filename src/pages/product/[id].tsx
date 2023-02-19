import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/src/styles/pages/product'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
/* import { useRouter } from 'next/router' */
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  /* na maioria das vezes o estado de loading (skeleton page) é o recomendado:  */
  /* const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }
 */

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyproduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      /* Se fosse redirecionar para rota interna:

      const router = useRouter()

      async function handleBuyproduct() {
      try {

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      router.push('/checkout')

      */

      // redirecionar para rota externa
      window.location.href = checkoutUrl
    } catch (err) {
      // Conectar com alguma ferramenta de observibilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>
        <button disabled={isCreatingCheckoutSession} onClick={handleBuyproduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // buscar os produtos mais acessados/vendidos
  // fallback true é mais comum

  /*  return {
    paths: [
      {
        params: { id: 'prod_NMbFUmbhTpfkkc' },
      },
    ],
    fallback: true,
  }
}
 */

  return {
    paths: [
      {
        params: { id: 'prod_NMbFUmbhTpfkkc' },
      },
    ],
    fallback: 'blocking',
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
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
