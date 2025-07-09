import { FC, ReactNode } from 'react'

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
}

export const ResponsiveGrid: FC<ResponsiveGridProps> = ({ children, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        width: "100%",
        gridAutoRows: "1fr",
      }}
    >
      {children}
    </div>
  )
}