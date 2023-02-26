import logoImg from '../../assets/logo.svg'
import { BagButton, BubbleContainer, HeaderContainer } from './styles'
import Image from 'next/image'
import { Bag } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import CartModal from '../CartModal'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart'

export default function Header() {
  const { cartCount } = useShoppingCart()

  const emptyCart = cartCount === 0

  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image src={logoImg} alt="" />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <BagButton>
            <Bag size={24} />
            {emptyCart ? null : <BubbleContainer>{cartCount}</BubbleContainer>}
          </BagButton>
        </Dialog.Trigger>

        <CartModal />
      </Dialog.Root>
    </HeaderContainer>
  )
}
