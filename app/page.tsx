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
            "linear-gradient(45deg, #4f46e5, #7c3aed, #2563eb, #4f46e5)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 8s ease infinite",
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
            * {
              will-change: auto;
            }
            .animated-element {
              will-change: transform, opacity;
              transform: translateZ(0);
              backface-visibility: hidden;
              perspective: 1000px;
            }
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes pulse {
              0% { transform: scale3d(1, 1, 1); }
              50% { transform: scale3d(1.05, 1.05, 1); }
              100% { transform: scale3d(1, 1, 1); }
            }
            @keyframes shake {
              0%, 100% { transform: translate3d(0, 0, 0); }
              25% { transform: translate3d(-5px, 0, 0); }
              75% { transform: translate3d(5px, 0, 0); }
            }
            @keyframes fireworks {
              0% { opacity: 0; transform: scale3d(0, 0, 1); }
              50% { opacity: 1; transform: scale3d(1.5, 1.5, 1); }
              100% { opacity: 0; transform: scale3d(2, 2, 1); }
            }
            @keyframes neon {
              0%, 100% { text-shadow: 0 0 8px #4f46e5, 0 0 12px #4f46e5; }
              50% { text-shadow: 0 0 10px #6366f1, 0 0 15px #6366f1; }
            }
            .gambling-card {
              animation: ${animatingCards.length > 0 ? "shake 0.1s infinite" : "none"};
              will-change: transform;
              transform: translateZ(0);
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
              className="animated-element"
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#ffffff",
                marginBottom: "1rem",
                animation: "neon 6s ease-in-out infinite",
                textAlign: "center",
                textShadow: "0 0 15px #4f46e5",
              }}
            >
              🍺 今日はどこで飲む？ 🍺
            </h1>
            <div
              className="animated-element"
              style={{
                background: "linear-gradient(45deg, #5b5bd6, #7c6dc7)",
                padding: "1rem",
                borderRadius: "10px",
                border: "2px solid #c7d2fe",
                boxShadow: "0 0 12px rgba(99, 102, 241, 0.2)",
                animation: "pulse 5s infinite",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "#ffffff",
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: 0,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                }}
              >
                ✨ 一番安いお店を当ててみよう！ ✨
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#e2e8f0",
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
                className="animated-element"
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#ffffff",
                  textShadow: "0 0 8px #4f46e5",
                  animation: "neon 5s ease-in-out infinite",
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
                  className="animated-element"
                  onClick={generateNewQuiz}
                  style={{
                    background: "linear-gradient(45deg, #5b5bd6, #7c6dc7)",
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "25px",
                    border: "2px solid #c7d2fe",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
                    transition: "background-image 0.15s ease-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundImage =
                      "linear-gradient(45deg, #6366f1, #8b5cf6)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundImage =
                      "linear-gradient(45deg, #5b5bd6, #7c6dc7)"
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

                let borderColor = "#e2e8f0"
                let backgroundImage = "linear-gradient(45deg, #1e293b, #374151)"
                let glowColor = "#6366f1"

                if (quizCompleted) {
                  if (isCorrect) {
                    borderColor = "#10b981"
                    backgroundImage = "linear-gradient(45deg, #059669, #34d399)"
                    glowColor = "#10b981"
                  } else if (isWrong) {
                    borderColor = "#ef4444"
                    backgroundImage = "linear-gradient(45deg, #dc2626, #7f1d1d)"
                    glowColor = "#ef4444"
                  }
                } else if (isRevealing) {
                  backgroundImage =
                    "linear-gradient(45deg, #6366f1, #8b5cf6, #a855f7)"
                  glowColor = "#8b5cf6"
                }

                return (
                  <div
                    aria-hidden="true"
                    key={index}
                    onClick={() => handleShopClick(index)}
                    className="gambling-card"
                    style={{
                      position: "relative",
                      backgroundImage: backgroundImage,
                      borderRadius: "15px",
                      boxShadow: `0 0 30px ${glowColor}, 0 10px 20px rgba(0, 0, 0, 0.5)`,
                      transition:
                        "background-image 0.15s ease-out, border-color 0.15s ease-out",
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
                        ? "scale3d(1.05, 1.05, 1)"
                        : "scale3d(1, 1, 1)",
                      backgroundSize: isRevealing ? "200% 200%" : "100% 100%",
                      animation: isRevealing
                        ? "gradientShift 0.5s infinite"
                        : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!quizCompleted && !isRevealing) {
                        e.currentTarget.style.backgroundImage =
                          "linear-gradient(45deg, #374151, #4b5563)"
                        e.currentTarget.style.borderColor = "#8b5cf6"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!quizCompleted && !isRevealing) {
                        e.currentTarget.style.backgroundImage = backgroundImage
                        e.currentTarget.style.borderColor = borderColor
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
                            color: "#ffffff",
                            marginBottom: "0.75rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
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
                                color: "#ffffff",
                                fontWeight: "600",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
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
                                      ? "0 0 10px #00ff00, 2px 2px 4px rgba(0, 0, 0, 0.8)"
                                      : "0 0 10px #ffffff, 2px 2px 4px rgba(0, 0, 0, 0.8)",
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
                                    color: "#ffffff",
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    textShadow:
                                      "1px 1px 2px rgba(0, 0, 0, 0.8)",
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
                                  textShadow:
                                    "0 0 20px #ffff00, 2px 2px 4px rgba(0, 0, 0, 0.8)",
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
                                  color: "#a855f7",
                                  textShadow:
                                    "0 0 8px #a855f7, 2px 2px 4px rgba(0, 0, 0, 0.8)",
                                  animation: "pulse 4s infinite",
                                }}
                              >
                                💰???💰
                              </span>
                            )}
                          </div>

                          {shop.note && (
                            <div
                              style={{
                                background: "rgba(30, 58, 138, 0.9)",
                                border: "2px solid #60a5fa",
                                borderRadius: "0.5rem",
                                padding: "0.75rem",
                                marginBottom: "0.75rem",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#ffffff",
                                  margin: 0,
                                  fontWeight: "600",
                                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
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
                                fontWeight: "600",
                                color: "#ffffff",
                                marginBottom: "0.5rem",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
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
                                    color: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "0.25rem",
                                    fontWeight: "500",
                                    textShadow:
                                      "1px 1px 2px rgba(0, 0, 0, 0.8)",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "0.5rem",
                                      height: "0.5rem",
                                      background: "#ffffff",
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
                      ? "0 0 15px #10b981"
                      : "0 0 15px #ef4444",
                  animation: "neon 3s ease-in-out infinite",
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
            className="animated-element"
            style={{
              textAlign: "center",
              background: "linear-gradient(45deg, #5b5bd6, #7c6dc7)",
              borderRadius: "20px",
              padding: "3rem",
              border: "3px solid #c7d2fe",
              boxShadow: "0 0 25px rgba(99, 102, 241, 0.3)",
              animation: "pulse 6s infinite",
            }}
          >
            <h2
              className="animated-element"
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#ffffff",
                marginBottom: "1rem",
                textShadow: "0 0 15px rgba(0, 0, 0, 0.7)",
                animation: "neon 4s ease-in-out infinite",
              }}
            >
              🍻 もっと探索してみる？ 🍻
            </h2>
            <p
              style={{
                color: "#e2e8f0",
                marginBottom: "2rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              }}
            >
              秋葉原の{shopList.length}店舗をチェックしよう！
            </p>
            <Link
              href="/shops"
              className="animated-element"
              style={{
                display: "inline-block",
                background: "linear-gradient(45deg, #a855f7, #6366f1)",
                color: "#ffffff",
                padding: "1.5rem 3rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.5rem",
                border: "3px solid #c7d2fe",
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                animation: "pulse 4s infinite",
                transition: "background-image 0.15s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage =
                  "linear-gradient(45deg, #9333ea, #7c3aed)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundImage =
                  "linear-gradient(45deg, #a855f7, #6366f1)"
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
