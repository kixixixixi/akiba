"use client"

import { shopList } from "../../constants/shops"
import { ShopCard, ResponsiveGrid, PageContainer } from "../../components"

export default function ShopsPage() {
  return (
    <PageContainer>
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

      <ResponsiveGrid>
        {shopList.map((shop, index) => (
          <ShopCard
            key={index}
            shop={shop}
            variant="default"
          />
        ))}
      </ResponsiveGrid>

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
    </PageContainer>
  )
}
