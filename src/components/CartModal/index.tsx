import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { ModalContent, ModalOverlay } from './styles'

export default function CartModal() {
  return (
    <Dialog.Portal>
      <ModalOverlay />

      <ModalContent>
        <Dialog.Close>
          <X size={24} />
        </Dialog.Close>

        <Dialog.Title>Sacola de compras</Dialog.Title>

        <ul>
          <li>Abacaxi</li>
          <li>Banana</li>
          <li>Morango</li>
        </ul>

        <div>
          <p>
            Quantidade <span>3 items </span>
          </p>
          <p>
            Valor total <span>R$ 270,00</span>
          </p>
        </div>

        <button>Finalizar a compra</button>
      </ModalContent>
    </Dialog.Portal>
  )
}
