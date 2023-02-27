import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import {
  CheckoutImageContainer,
  ImageContainer,
  SuccessContainer,
} from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  products: {
    name: string
    images: string[]
  }[]
  singleProductQuantity: number
  singleProductName: {
    name: string
  }
  cartLength: number
}

export default function Success({
  customerName,
  products,
  singleProductQuantity,
  singleProductName,
  cartLength,
}: SuccessProps) {
  const onlyOneShirt = cartLength === 1 && singleProductQuantity === 1

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <CheckoutImageContainer>
          {products.map((shirtImage) => {
            return (
              <ImageContainer key={shirtImage.name}>
                <Image
                  src={shirtImage.images[0]}
                  width={120}
                  height={110}
                  alt=""
                />
              </ImageContainer>
            )
          })}
        </CheckoutImageContainer>
        <p>
          Uhuul! <strong>{customerName}</strong>,{' '}
          {onlyOneShirt
            ? `a sua ${singleProductName.name} já está a caminho da sua casa. `
            : 'as suas camisas já estão a caminho de sua casa.'}
        </p>
        <Link href={'/'}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name

  const cartLength = session.line_items.data.length

  const products = session.line_items.data.map((shirt) => {
    return shirt.price.product as Stripe.Product
  })

  const singleProductQuantity = session.line_items.data[0].quantity
  const singleProductName = session.line_items.data[0].price
    .product as Stripe.Product

  return {
    props: {
      customerName,
      products,
      singleProductName: {
        name: singleProductName.name,
      },
      singleProductQuantity,
      cartLength,
    },
  }
}
