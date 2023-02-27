import Image from 'next/image'
import Head from 'next/head'

import { AddToCartButton, HomeContainer, Product } from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import { /* GetServerSideProps */ GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { Bag } from 'phosphor-react'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  const { addItem } = useShoppingCart()

  function handleBuyThisItem(product) {
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
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`./product/${product.id}`}
              key={product.id}
              prefetch={false}
              passHref
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>
                      {formatCurrencyString({
                        value: product.price,
                        currency: 'BRL',
                      })}
                    </span>
                  </div>

                  <AddToCartButton
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      handleBuyThisItem(product)
                    }}
                  >
                    <Bag size={24} />
                  </AddToCartButton>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

/* export const getServerSideProps: GetServerSideProps = async () => { */
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
