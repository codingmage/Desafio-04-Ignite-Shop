import {
  DialogClose,
  DialogContent,
  DialogOverlay,
} from '@radix-ui/react-dialog'
import { styled } from '../../styles'

export const ModalOverlay = styled(DialogOverlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
})

export const ModalContent = styled(DialogContent, {
  minWidth: '30rem',
  borderRadius: '6px',
  background: '$gray800',
  position: 'fixed',
  top: '0',
  right: '0',
  height: '100vh',
  boxSizing: 'border-box',

  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  padding: '2rem',

  ul: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',

    overflowY: 'auto',
  },

  button: {
    cursor: 'pointer',
    border: 'none',
  },
})

export const EmptyCartContainer = styled('span', {
  flexGrow: 1,
  alignSelf: 'center',
  marginTop: '10rem',
  fontWeight: 'bold',
  fontSize: '$lg',
})

export const BuyButton = styled('button', {
  backgroundColor: '$green500',
  color: '$white',
  padding: '1.5rem',
  borderRadius: '6px',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  },
})

export const ShirtContainer = styled('div', {
  listStyleType: 'none',
  display: 'flex',
  gap: '1rem',

  p: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },

  'p:first-of-type': {
    color: '$gray300',
  },

  'p:last-child': {
    fontWeight: 'bold',
  },

  'p:last-child span': {
    fontSize: '$lg',
  },
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,

  img: {
    objectFit: 'cover',
  },
})

export const ButtonContainer = styled('span', {
  display: 'flex',
  gap: '0.25rem',

  button: {
    backgroundColor: '$green500',
    borderRadius: 8,
    padding: '0.2rem',
  },
})

export const CloseButton = styled(DialogClose, {
  padding: '0',
  color: '$gray300',
  width: '2rem',
  alignSelf: 'flex-end',
  backgroundColor: '$gray800',
})

export const CartTotalDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  p: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  'p:last-of-type': {
    fontWeight: 'bold',
    fontSize: '$lg',
  },
})
