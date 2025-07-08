"use client"

import React, { FC, useState, useEffect } from "react"
import Link from "next/link"
import { shopList } from "../constants/shops"

const Page: FC = () => {
  const [randomShops, setRandomShops] = useState<typeof shopList>([])
  const [selectedShop, setSelectedShop] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [animatingCards, setAnimatingCards] = useState<number[]>([])

  const generateNewQuiz = () => {
    const shopsWithPrices = shopList.filter((shop) => shop.beer_price !== null)
    const shuffled = [...shopsWithPrices].sort(() => 0.5 - Math.random())
    const selectedShops = shuffled.slice(0, 3)

    const cheapestIndex = selectedShops.reduce((minIndex, shop, index) => {
      return shop.beer_price! < selectedShops[minIndex].beer_price!
        ? index
        : minIndex
    }, 0)

    setRandomShops(selectedShops)
    setCorrectAnswer(cheapestIndex)
    setSelectedShop(null)
    setQuizCompleted(false)
    setIsRevealing(false)
    setShowFireworks(false)
    setAnimatingCards([])
  }

  useEffect(() => {
    generateNewQuiz()
  }, [])

  const handleShopClick = (index: number) => {
    if (quizCompleted || isRevealing) return

    setSelectedShop(index)
    setIsRevealing(true)
    setAnimatingCards([0, 1, 2])

    setTimeout(() => {
      setAnimatingCards([])
      setQuizCompleted(true)
      if (index === correctAnswer) {
        setShowFireworks(true)
        setTimeout(() => setShowFireworks(false), 3000)
      }
    }, 2000)
  }

  return (
    <React.Fragment>
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080, #ff8c00)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 3s ease infinite",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>
          {`
            html, body {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            *, *::before, *::after {
              box-sizing: border-box;
            }
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-5px); }
              75% { transform: translateX(5px); }
            }
            @keyframes fireworks {
              0% { opacity: 0; transform: scale(0); }
              50% { opacity: 1; transform: scale(1.5); }
              100% { opacity: 0; transform: scale(2); }
            }
            @keyframes neon {
              0%, 100% { text-shadow: 0 0 5px #ff0080, 0 0 10px #ff0080, 0 0 15px #ff0080; }
              50% { text-shadow: 0 0 10px #40e0d0, 0 0 20px #40e0d0, 0 0 30px #40e0d0; }
            }
            .gambling-card {
              animation: ${animatingCards.length > 0 ? "shake 0.1s infinite" : "none"};
            }
          `}
        </style>
        {showFireworks && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: "10px",
                  height: "10px",
                  background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  borderRadius: "50%",
                  animation: "fireworks 1s ease-out infinite",
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
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
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#ffffff",
                marginBottom: "1rem",
                animation: "neon 2s ease-in-out infinite",
                textAlign: "center",
                textShadow: "0 0 20px #ff0080",
              }}
            >
              🍺 今日はどこで飲む？ 🍺
            </h1>
            <div
              style={{
                background: "linear-gradient(45deg, #ff0080, #ffff00)",
                padding: "1rem",
                borderRadius: "10px",
                border: "3px solid #ffffff",
                boxShadow: "0 0 20px #ff0080",
                animation: "pulse 1s infinite",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "#000000",
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: 0,
                  textShadow: "2px 2px 4px #ffffff",
                }}
              >
                ✨ 一番安いお店を当ててみよう！ ✨
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#000000",
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: "0.5rem 0 0 0",
                }}
              >
                正解すると嬉しい気分！
              </p>
            </div>
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
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#ffffff",
                  textShadow: "0 0 10px #ff0080",
                  animation: "neon 1s ease-in-out infinite",
                }}
              >
                {isRevealing
                  ? "🔍 結果を確認中... 🔍"
                  : quizCompleted
                    ? "🎊 結果発表！ 🎊"
                    : "💡 どの店舗が一番安い？ 💡"}
              </h2>
              {quizCompleted && (
                <button
                  onClick={generateNewQuiz}
                  style={{
                    background: "linear-gradient(45deg, #ff0080, #ff8c00)",
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "50px",
                    border: "3px solid #ffffff",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textShadow: "2px 2px 4px #000000",
                    boxShadow: "0 0 20px #ff0080",
                    animation: "pulse 1s infinite",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  🔄 新しいクイズに挑戦！ 🔄
                </button>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {randomShops.map((shop, index) => {
                const isCorrect = correctAnswer === index
                const isWrong =
                  quizCompleted && selectedShop === index && !isCorrect

                let borderColor = "#ffffff"
                let backgroundColor = "linear-gradient(45deg, #000000, #333333)"
                let glowColor = "#ff0080"

                if (quizCompleted) {
                  if (isCorrect) {
                    borderColor = "#00ff00"
                    backgroundColor = "linear-gradient(45deg, #00ff00, #ffff00)"
                    glowColor = "#00ff00"
                  } else if (isWrong) {
                    borderColor = "#ff0000"
                    backgroundColor = "linear-gradient(45deg, #ff0000, #000000)"
                    glowColor = "#ff0000"
                  }
                } else if (isRevealing) {
                  backgroundColor =
                    "linear-gradient(45deg, #ff0080, #40e0d0, #ff8c00)"
                  glowColor = "#ffff00"
                }

                return (
                  <div
                    aria-hidden="true"
                    key={index}
                    onClick={() => handleShopClick(index)}
                    className="gambling-card"
                    style={{
                      position: "relative",
                      background: backgroundColor,
                      borderRadius: "15px",
                      boxShadow: `0 0 30px ${glowColor}, 0 10px 20px rgba(0, 0, 0, 0.5)`,
                      transition: "all 0.3s ease-in-out",
                      padding: "1.5rem",
                      border: `4px solid ${borderColor}`,
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "250px",
                      width: "100%",
                      boxSizing: "border-box",
                      cursor:
                        quizCompleted || isRevealing ? "default" : "pointer",
                      transform: animatingCards.includes(index)
                        ? "scale(1.05)"
                        : "scale(1)",
                      backgroundSize: isRevealing ? "200% 200%" : "100% 100%",
                      animation: isRevealing
                        ? "gradientShift 0.5s infinite"
                        : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!quizCompleted && !isRevealing) {
                        e.currentTarget.style.transform = "scale(1.1)"
                        e.currentTarget.style.boxShadow = `0 0 50px ${glowColor}, 0 20px 40px rgba(0, 0, 0, 0.7)`
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!quizCompleted && !isRevealing) {
                        e.currentTarget.style.transform = "scale(1)"
                        e.currentTarget.style.boxShadow = `0 0 30px ${glowColor}, 0 10px 20px rgba(0, 0, 0, 0.5)`
                      }
                    }}
                  >
                    {quizCompleted && isCorrect && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          background:
                            "linear-gradient(45deg, #ff0080, #ffff00)",
                          color: "#000000",
                          padding: "1rem",
                          borderRadius: "50%",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          border: "3px solid #ffffff",
                          boxShadow: "0 0 20px #ffff00",
                          animation: "pulse 0.5s infinite",
                          textShadow: "2px 2px 4px #ffffff",
                          zIndex: 10,
                        }}
                      >
                        🎉
                      </div>
                    )}
                    {quizCompleted && isWrong && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          background:
                            "linear-gradient(45deg, #ff0000, #000000)",
                          color: "#ffffff",
                          padding: "1rem",
                          borderRadius: "50%",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          border: "3px solid #ffffff",
                          boxShadow: "0 0 20px #ff0000",
                          textShadow: "2px 2px 4px #000000",
                          zIndex: 10,
                        }}
                      >
                        💥
                      </div>
                    )}
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
                            color: "#f1f5f9",
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
                                color: "#94a3b8",
                              }}
                            >
                              ビール価格
                            </span>
                            {quizCompleted ? (
                              shop.beer_price ? (
                                <span
                                  style={{
                                    fontSize: "2rem",
                                    fontWeight: "bold",
                                    color: isCorrect ? "#00ff00" : "#ffffff",
                                    textShadow: isCorrect
                                      ? "0 0 10px #00ff00"
                                      : "0 0 10px #ffffff",
                                    animation: isCorrect
                                      ? "pulse 0.5s infinite"
                                      : "none",
                                  }}
                                >
                                  ¥{shop.beer_price}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: "#ff0000",
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  価格未設定
                                </span>
                              )
                            ) : isRevealing ? (
                              <span
                                style={{
                                  fontSize: "2rem",
                                  fontWeight: "bold",
                                  color: "#ffff00",
                                  textShadow: "0 0 20px #ffff00",
                                  animation: "neon 0.3s ease-in-out infinite",
                                }}
                              >
                                🔍🔍🔍
                              </span>
                            ) : (
                              <span
                                style={{
                                  fontSize: "2rem",
                                  fontWeight: "bold",
                                  color: "#ff0080",
                                  textShadow: "0 0 10px #ff0080",
                                  animation: "pulse 2s infinite",
                                }}
                              >
                                💰???💰
                              </span>
                            )}
                          </div>

                          {shop.note && (
                            <div
                              style={{
                                background: "#1e3a8a",
                                border: "1px solid #3b82f6",
                                borderRadius: "0.25rem",
                                padding: "0.5rem",
                                marginBottom: "0.75rem",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#93c5fd",
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
                              borderTop: "1px solid #475569",
                              paddingTop: "0.75rem",
                            }}
                          >
                            <h4
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "#cbd5e1",
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
                                    color: "#94a3b8",
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "0.25rem",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "0.5rem",
                                      height: "0.5rem",
                                      background: "#64748b",
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
                )
              })}
            </div>
          </section>

          {quizCompleted && (
            <section
              style={{
                marginBottom: "3rem",
                textAlign: "center",
                padding: "2rem",
                background:
                  selectedShop === correctAnswer ? "#064e3b" : "#7f1d1d",
                borderRadius: "0.5rem",
                border: `2px solid ${selectedShop === correctAnswer ? "#10b981" : "#ef4444"}`,
              }}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  color: selectedShop === correctAnswer ? "#00ff00" : "#ff0000",
                  marginBottom: "1rem",
                  textShadow:
                    selectedShop === correctAnswer
                      ? "0 0 20px #00ff00"
                      : "0 0 20px #ff0000",
                  animation: "neon 1s ease-in-out infinite",
                }}
              >
                {selectedShop === correctAnswer
                  ? "🎉 正解です！ 🎉"
                  : "😅 残念！不正解でした 😅"}
              </h2>
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "#ffffff",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
                {selectedShop === correctAnswer
                  ? `${randomShops[correctAnswer!].name} が一番安くて ¥${randomShops[correctAnswer!].beer_price} でした！`
                  : `正解は ${randomShops[correctAnswer!].name} で ¥${randomShops[correctAnswer!].beer_price} でした。`}
              </p>
            </section>
          )}

          <section
            style={{
              textAlign: "center",
              background: "linear-gradient(45deg, #ff0080, #40e0d0)",
              borderRadius: "20px",
              padding: "3rem",
              border: "5px solid #ffffff",
              boxShadow: "0 0 40px #ff0080",
              animation: "pulse 2s infinite",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#ffffff",
                marginBottom: "1rem",
                textShadow: "0 0 20px #000000",
                animation: "neon 2s ease-in-out infinite",
              }}
            >
              🍻 もっと探索してみる？ 🍻
            </h2>
            <p
              style={{
                color: "#000000",
                marginBottom: "2rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textShadow: "2px 2px 4px #ffffff",
              }}
            >
              秋葉原の{shopList.length}店舗をチェックしよう！
            </p>
            <Link
              href="/shops"
              style={{
                display: "inline-block",
                background: "linear-gradient(45deg, #ffff00, #ff0080)",
                color: "#000000",
                padding: "1.5rem 3rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.5rem",
                border: "4px solid #ffffff",
                boxShadow: "0 0 30px #ffff00",
                textShadow: "2px 2px 4px #ffffff",
                animation: "pulse 1s infinite",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              📱 全店舗一覧を見る 📱
            </Link>
          </section>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Page
