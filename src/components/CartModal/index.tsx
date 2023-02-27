import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import {
  ButtonContainer,
  BuyButton,
  CartTotalDetails,
  CloseButton,
  EmptyCartContainer,
  ImageContainer,
  ModalContent,
  ModalOverlay,
  ShirtContainer,
} from './styles'

export default function CartModal() {
  const {
    removeItem,
    cartDetails,
    cartCount,
    formattedTotalPrice,
    incrementItem,
    decrementItem,
    clearCart,
  } = useShoppingCart()

  const formattedData = Object.entries(cartDetails).map(([key, value]) => {
    return {
      id: key,
      name: value.name,
      image: value.image,
      formattedPrice: value.formattedPrice,
      priceId: value.price_id,
      quantity: value.quantity,
      price: value.price,
    }
  })

  const isCartEmpty = cartCount === 0

  async function handleCheckout() {
    try {
      const response = await axios.post('/api/checkout', {
        formattedData,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

      clearCart()
    } catch (err) {
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <Dialog.Portal>
      <ModalOverlay />

      <ModalContent>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <Dialog.Title>Sacola de compras</Dialog.Title>

        {isCartEmpty ? (
          <EmptyCartContainer> Seu carrinho está vazio. </EmptyCartContainer>
        ) : (
          <ul>
            {formattedData.map((shirt) => {
              return (
                <ShirtContainer key={shirt.priceId}>
                  <ImageContainer>
                    <Image src={shirt.image} alt="" width={120} height={90} />
                  </ImageContainer>
                  <div>
                    <p>{shirt.name}</p>
                    <span>{shirt.formattedPrice}</span>
                    <p>Quantidade: {shirt.quantity}</p>
                    <ButtonContainer>
                      <button onClick={() => incrementItem(shirt.id)}>
                        Adicionar
                      </button>
                      <button onClick={() => decrementItem(shirt.id)}>
                        Reduzir
                      </button>
                      <button onClick={() => removeItem(shirt.id)}>
                        Excluir item
                      </button>
                    </ButtonContainer>
                  </div>
                </ShirtContainer>
              )
            })}
          </ul>
        )}
        <CartTotalDetails>
          <p>
            Quantidade{' '}
            <span>
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </p>
          <p>
            Valor total <span>{formattedTotalPrice}</span>
          </p>
        </CartTotalDetails>

        <BuyButton disabled={isCartEmpty} onClick={handleCheckout}>
          Finalizar a compra
        </BuyButton>
      </ModalContent>
    </Dialog.Portal>
  )
}
