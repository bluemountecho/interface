import styled, { Colors, Layer, useTheme } from 'lib/styled'
import { createContext, ReactNode, useContext } from 'react'
import { createPortal } from 'react-dom'

export { default as Header } from './Header'

const Context = createContext<HTMLDivElement | null>(null)

export const Provider = Context.Provider

const Wrapper = styled.div`
  border-radius: ${({ theme }) => Math.max(theme.borderRadius - 4, 0)}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: calc(100% - 8px);
  left: 0;
  margin: 4px;
  padding: 14px 16px 0;
  position: absolute;
  top: 0;
  width: calc(100% - 8px);
  z-index: ${Layer.MODAL};
`

export const Body = styled.div`
  margin-right: -16px;
  overflow-y: scroll;
  padding: 16px 16px 0 0;
`

interface ModalProps {
  color?: keyof Colors
  children: ReactNode
}

export default function Modal({ color = 'modalBg', children }: ModalProps) {
  const modal = useContext(Context)
  const theme = useTheme()
  const backgroundColor = theme[color]
  return modal && createPortal(<Wrapper style={{ backgroundColor }}>{children}</Wrapper>, modal)
}
