import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
})

export const BagButton = styled('button', {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.1rem 0.6rem',
  backgroundColor: '$gray800',
  borderRadius: '6px',
  border: 'none',
  color: '$gray300',
  cursor: 'pointer',
  width: '3rem',
  height: '3rem',

  '&:hover': {
    color: '$gray100',
  },
})

export const BubbleContainer = styled('span', {
  position: 'absolute',
  color: '$white',
  backgroundColor: '$green500',
  borderRadius: 999,
  width: '1.2rem',
  height: '1.2rem',
  marginBottom: '2rem',
  marginLeft: '2.5rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
