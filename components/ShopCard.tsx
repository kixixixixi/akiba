import { FC } from 'react'

interface Shop {
  name: string
  beer_price: number | null
  locations?: string[]
  note?: string
}

interface ShopCardProps {
  shop: Shop
  className?: string
  variant?: 'default' | 'quiz'
  isSelected?: boolean
  isCorrect?: boolean
  isWrong?: boolean
  isRevealing?: boolean
  _showFireworks?: boolean
  animatingCards?: number[]
  index?: number
  onClick?: () => void
}

export const ShopCard: FC<ShopCardProps> = ({
  shop,
  className = '',
  variant = 'default',
  isSelected = false,
  isCorrect = false,
  isWrong = false,
  isRevealing = false,
  _showFireworks = false,
  animatingCards = [],
  index = 0,
  onClick
}) => {
  const getCardStyles = () => {
    if (variant === 'quiz') {
      let borderColor = "#e2e8f0"
      let backgroundImage = "linear-gradient(45deg, #1e293b, #374151)"
      let glowColor = "#6366f1"

      if (isCorrect) {
        borderColor = "#10b981"
        backgroundImage = "linear-gradient(45deg, #059669, #34d399)"
        glowColor = "#10b981"
      } else if (isWrong) {
        borderColor = "#ef4444"
        backgroundImage = "linear-gradient(45deg, #dc2626, #7f1d1d)"
        glowColor = "#ef4444"
      } else if (isRevealing) {
        backgroundImage = "linear-gradient(45deg, #6366f1, #8b5cf6, #a855f7)"
        glowColor = "#8b5cf6"
      }

      return {
        position: "relative" as const,
        backgroundImage: backgroundImage,
        borderRadius: "15px",
        boxShadow: `0 0 30px ${glowColor}, 0 10px 20px rgba(0, 0, 0, 0.5)`,
        transition: "background-image 0.15s ease-out, border-color 0.15s ease-out",
        padding: "1.5rem",
        border: `4px solid ${borderColor}`,
        display: "flex",
        flexDirection: "column" as const,
        minHeight: "250px",
        width: "100%",
        boxSizing: "border-box" as const,
        cursor: onClick ? "pointer" : "default",
        transform: animatingCards.includes(index) ? "scale3d(1.05, 1.05, 1)" : "scale3d(1, 1, 1)",
        backgroundSize: isRevealing ? "200% 200%" : "100% 100%",
        animation: isRevealing ? "gradientShift 0.5s infinite" : "none",
      }
    }

    return {
      background: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: "box-shadow 0.2s ease-in-out",
      padding: "1.5rem",
      border: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column" as const,
      minHeight: "250px",
      width: "100%",
      boxSizing: "border-box" as const,
    }
  }

  const getPriceStyles = () => {
    if (variant === 'quiz') {
      if (isCorrect) {
        return {
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#00ff00",
          textShadow: "0 0 10px #00ff00, 2px 2px 4px rgba(0, 0, 0, 0.8)",
          animation: "pulse 0.5s infinite",
        }
      } else if (isRevealing) {
        return {
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#ffff00",
          textShadow: "0 0 20px #ffff00, 2px 2px 4px rgba(0, 0, 0, 0.8)",
          animation: "neon 0.3s ease-in-out infinite",
        }
      } else if (shop.beer_price) {
        return {
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#ffffff",
          textShadow: "0 0 10px #ffffff, 2px 2px 4px rgba(0, 0, 0, 0.8)",
        }
      }
    }

    return {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#059669",
    }
  }

  const renderPrice = () => {
    if (variant === 'quiz') {
      if (isRevealing) {
        return (
          <span style={getPriceStyles()}>
            🔍🔍🔍
          </span>
        )
      } else if (shop.beer_price && (isCorrect || isWrong || isSelected)) {
        return (
          <span style={getPriceStyles()}>
            ¥{shop.beer_price}
          </span>
        )
      } else {
        return (
          <span style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#a855f7",
            textShadow: "0 0 8px #a855f7, 2px 2px 4px rgba(0, 0, 0, 0.8)",
            animation: "pulse 4s infinite",
          }}>
            💰???💰
          </span>
        )
      }
    }

    return shop.beer_price ? (
      <span style={getPriceStyles()}>
        ¥{shop.beer_price}
      </span>
    ) : (
      <span style={{
        color: "#9ca3af",
        fontSize: "0.875rem",
      }}>
        価格未設定
      </span>
    )
  }

  const textColor = variant === 'quiz' ? '#ffffff' : '#1f2937'
  const priceTextColor = variant === 'quiz' ? '#ffffff' : '#6b7280'

  return (
    <div
      className={`gambling-card ${className}`}
      style={getCardStyles()}
      onClick={onClick}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick()
        }
      } : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onMouseEnter={(e) => {
        if (variant === 'default') {
          e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'default') {
          e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }
      }}
    >
      {variant === 'quiz' && isCorrect && (
        <div style={{
          position: "absolute",
          top: "-15px",
          right: "-15px",
          background: "linear-gradient(45deg, #10b981, #34d399)",
          color: "#ffffff",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          fontSize: "2rem",
          fontWeight: "bold",
          border: "3px solid #ffffff",
          boxShadow: "0 0 20px #10b981",
          animation: "pulse 0.5s infinite",
          textShadow: "2px 2px 4px #000000",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          ✅
        </div>
      )}
      {variant === 'quiz' && isWrong && (
        <div style={{
          position: "absolute",
          top: "-15px",
          right: "-15px",
          background: "linear-gradient(45deg, #ef4444, #dc2626)",
          color: "#ffffff",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          fontSize: "2rem",
          fontWeight: "bold",
          border: "3px solid #ffffff",
          boxShadow: "0 0 20px #ef4444",
          textShadow: "2px 2px 4px #000000",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          ❌
        </div>
      )}
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: "1.125rem",
            fontWeight: "bold",
            color: textColor,
            marginBottom: "0.75rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textShadow: variant === 'quiz' ? "2px 2px 4px rgba(0, 0, 0, 0.8)" : "none",
          }}>
            {shop.name}
          </h3>

          <div style={{ marginBottom: "1rem" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}>
              <span style={{
                fontSize: "0.875rem",
                color: priceTextColor,
                fontWeight: variant === 'quiz' ? "600" : "normal",
                textShadow: variant === 'quiz' ? "1px 1px 2px rgba(0, 0, 0, 0.8)" : "none",
              }}>
                ビール価格
              </span>
              {renderPrice()}
            </div>

            {shop.note && (
              <div style={{
                background: variant === 'quiz' ? "rgba(30, 58, 138, 0.9)" : "#eff6ff",
                border: variant === 'quiz' ? "2px solid #60a5fa" : "1px solid #bfdbfe",
                borderRadius: variant === 'quiz' ? "0.5rem" : "0.25rem",
                padding: variant === 'quiz' ? "0.75rem" : "0.5rem",
                marginBottom: "0.75rem",
                boxShadow: variant === 'quiz' ? "0 2px 8px rgba(0, 0, 0, 0.3)" : "none",
              }}>
                <p style={{
                  fontSize: "0.875rem",
                  color: variant === 'quiz' ? "#ffffff" : "#1e40af",
                  margin: 0,
                  fontWeight: variant === 'quiz' ? "600" : "normal",
                  textShadow: variant === 'quiz' ? "1px 1px 2px rgba(0, 0, 0, 0.8)" : "none",
                }}>
                  {shop.note}
                </p>
              </div>
            )}
          </div>
        </div>

        {shop.locations && (
          <div style={{ marginTop: "auto" }}>
            <div style={{
              borderTop: `1px solid ${variant === 'quiz' ? '#475569' : '#e5e7eb'}`,
              paddingTop: "0.75rem",
            }}>
              <h4 style={{
                fontSize: "0.875rem",
                fontWeight: variant === 'quiz' ? "600" : "500",
                color: variant === 'quiz' ? "#ffffff" : "#374151",
                marginBottom: "0.5rem",
                textShadow: variant === 'quiz' ? "1px 1px 2px rgba(0, 0, 0, 0.8)" : "none",
              }}>
                店舗情報
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}>
                {shop.locations.map((location, locIndex) => (
                  <li
                    key={locIndex}
                    style={{
                      fontSize: "0.875rem",
                      color: variant === 'quiz' ? "#ffffff" : "#6b7280",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.25rem",
                      fontWeight: variant === 'quiz' ? "500" : "normal",
                      textShadow: variant === 'quiz' ? "1px 1px 2px rgba(0, 0, 0, 0.8)" : "none",
                    }}
                  >
                    <span style={{
                      width: "0.5rem",
                      height: "0.5rem",
                      background: variant === 'quiz' ? "#ffffff" : "#9ca3af",
                      borderRadius: "50%",
                      marginRight: "0.5rem",
                    }}></span>
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}