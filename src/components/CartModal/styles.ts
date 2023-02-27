import { DialogContent, DialogOverlay } from '@radix-ui/react-dialog'
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

  li: {
    listStyleType: 'none',
  },

  p: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },

  'p:last-child': {
    fontWeight: 'bold',
  },

  'p:last-child span': {
    fontSize: '$lg',
  },

  button: {
    backgroundColor: '$green500',
    cursor: 'pointer',
    border: 'none',
    color: '$white',
    padding: '1.5rem',
    borderRadius: '6px',
  },

  'button:first-child': {
    padding: '0',
    color: '$gray300',
    width: '2rem',
    alignSelf: 'flex-end',
    backgroundColor: '$gray800',
  },
})

export const EmptyCartContainer = styled('span', {
  flexGrow: 1,
  alignSelf: 'center',
  marginTop: '10rem',
  fontWeight: 'bold',
  fontSize: '$lg',
})
