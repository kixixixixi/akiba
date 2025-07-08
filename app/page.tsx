"use client"

import React, { FC, useState, useEffect } from "react"
import Link from "next/link"
import { shopList } from "../constants/shops"

const Page: FC = () => {
  const [randomShops, setRandomShops] = useState<typeof shopList>([])

  useEffect(() => {
    const shuffled = [...shopList].sort(() => 0.5 - Math.random())
    setRandomShops(shuffled.slice(0, 3))
  }, [])

  return (
    <React.Fragment>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1rem",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "1rem",
            }}
          >
            秋葉原グルメガイド
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              marginBottom: "2rem",
            }}
          >
            秋葉原の美味しいお店とビール価格をチェック
          </p>
        </header>

        <section
          style={{
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1f2937",
              }}
            >
              おすすめの店舗
            </h2>
            <Link
              href="/shops"
              style={{
                color: "#059669",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              すべての店舗を見る →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {randomShops.map((shop, index) => (
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
                  minHeight: "200px",
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
                    <h3
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
                    </h3>

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
                        <h4
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#374151",
                            marginBottom: "0.5rem",
                          }}
                        >
                          店舗情報
                        </h4>
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
        </section>

        <section
          style={{
            textAlign: "center",
            background: "#f9fafb",
            borderRadius: "0.5rem",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "1rem",
            }}
          >
            すべての店舗を探索
          </h2>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "1.5rem",
            }}
          >
            秋葉原の{shopList.length}店舗の中からお気に入りを見つけよう
          </p>
          <Link
            href="/shops"
            style={{
              display: "inline-block",
              background: "#059669",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontWeight: "500",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#047857"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#059669"
            }}
          >
            店舗一覧を見る
          </Link>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Page
