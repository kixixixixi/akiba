import { FC, ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export const PageContainer: FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
    >
      {children}
    </div>
  )
}