import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'
import { CartProvider } from 'use-shopping-cart'
import Header from '../components/Header'

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
        <Header />
        {/*         <Header>
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
        </Header> */}
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
