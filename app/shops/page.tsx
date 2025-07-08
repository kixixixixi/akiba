"use client"

import { shopList } from "../../constants/shops"
import { useState, useEffect } from "react"

export default function ShopsPage() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getGridColumns = () => {
    if (windowWidth === 0) return "1fr" // 初期状態
    if (windowWidth >= 1024) return "repeat(3, 1fr)"
    if (windowWidth >= 768) return "repeat(2, 1fr)"
    return "1fr"
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#1f2937",
        }}
      >
        秋葉原の店舗一覧
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: getGridColumns(),
          gap: "1.5rem",
          width: "100%",
          gridAutoRows: "1fr",
        }}
      >
        {shopList.map((shop, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "0.5rem",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              transition: "box-shadow 0.2s ease-in-out",
              padding: "1.5rem",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              minHeight: "250px",
              width: "100%",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  flex: 1,
                }}
              >
                <h2
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "0.75rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {shop.name}
                </h2>

                <div
                  style={{
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      ビール価格
                    </span>
                    {shop.beer_price ? (
                      <span
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#059669",
                        }}
                      >
                        ¥{shop.beer_price}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#9ca3af",
                          fontSize: "0.875rem",
                        }}
                      >
                        価格未設定
                      </span>
                    )}
                  </div>

                  {shop.note && (
                    <div
                      style={{
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        borderRadius: "0.25rem",
                        padding: "0.5rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#1e40af",
                          margin: 0,
                        }}
                      >
                        {shop.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {shop.locations && (
                <div
                  style={{
                    marginTop: "auto",
                  }}
                >
                  <div
                    style={{
                      borderTop: "1px solid #e5e7eb",
                      paddingTop: "0.75rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "#374151",
                        marginBottom: "0.5rem",
                      }}
                    >
                      店舗情報
                    </h3>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {shop.locations.map((location, locIndex) => (
                        <li
                          key={locIndex}
                          style={{
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "0.25rem",
                          }}
                        >
                          <span
                            style={{
                              width: "0.5rem",
                              height: "0.5rem",
                              background: "#9ca3af",
                              borderRadius: "50%",
                              marginRight: "0.5rem",
                            }}
                          ></span>
                          {location}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          background: "#f9fafb",
          borderRadius: "0.5rem",
          padding: "1.5rem",
        }}
      >
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.875rem",
            margin: 0,
          }}
        >
          全{shopList.length}店舗 | ビール価格が設定されている店舗:{" "}
          {shopList.filter((shop) => shop.beer_price).length}店舗
        </p>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.875rem",
            margin: 0,
            marginTop: "0.5rem",
          }}
        >
          最低価格: ¥
          {Math.min(
            ...shopList
              .filter((shop) => shop.beer_price)
              .map((shop) => shop.beer_price!)
          )}{" "}
          | 最高価格: ¥
          {Math.max(
            ...shopList
              .filter((shop) => shop.beer_price)
              .map((shop) => shop.beer_price!)
          )}
        </p>
      </div>
    </div>
  )
}
