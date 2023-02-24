import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
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

  '&:hover': {
    color: '$gray100',
  },
})
