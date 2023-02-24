import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import { ModalContent, ModalOverlay } from './styles'

export default function CartModal() {
  const {
    removeItem,
    cartDetails,
    cartCount,
    formattedTotalPrice,
    incrementItem,
    decrementItem,
  } = useShoppingCart()

  const formattedData = Object.entries(cartDetails).map(([key, value]) => {
    return {
      id: key,
      name: value.name,
      image: value.image,
      formattedPrice: value.formattedPrice,
      priceId: value.price_id,
      quantity: value.quantity,
    }
  })

  return (
    <Dialog.Portal>
      <ModalOverlay />

      <ModalContent>
        <Dialog.Close>
          <X size={24} />
        </Dialog.Close>

        <Dialog.Title>Sacola de compras</Dialog.Title>

        <ul>
          {formattedData.map((shirt) => {
            return (
              <li key={shirt.priceId}>
                <Image src={shirt.image} alt="" width={120} height={90} />
                <p>{shirt.name}</p>
                <span>{shirt.formattedPrice}</span>
                <p>Quantidade: {shirt.quantity}</p>
                <button onClick={() => incrementItem(shirt.id)}>Add</button>
                <button onClick={() => decrementItem(shirt.id)}>Remove</button>
                <button onClick={() => removeItem(shirt.id)}>
                  {' '}
                  Excluir item
                </button>
              </li>
            )
          })}
        </ul>

        <div>
          <p>
            Quantidade <span>{cartCount}</span>
          </p>
          <p>
            Valor total <span>{formattedTotalPrice}</span>
          </p>
        </div>

        <button>Finalizar a compra</button>
      </ModalContent>
    </Dialog.Portal>
  )
}
