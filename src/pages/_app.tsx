import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import { BagButton, Container, Header } from '../styles/pages/app'
import Image from 'next/image'
import { Bag } from 'phosphor-react'
import { CartProvider } from 'use-shopping-cart'
import * as Dialog from '@radix-ui/react-dialog'
import CartModal from '../components/CartModal'
import Link from 'next/link'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      shouldPersist
      /* mode="payment" */
      cartMode="checkout-session"
      stripe={process.env.STRIPE_PUBLIC_KEY}
      currency="BRL"
    >
      <Container>
        <Header>
          <Link href={'/'}>
            <Image src={logoImg} alt="" />
          </Link>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <BagButton>
                <Bag size={24} />
              </BagButton>
            </Dialog.Trigger>

            <CartModal />
          </Dialog.Root>
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
