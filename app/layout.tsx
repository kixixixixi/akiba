export const metadata = {
  title: "今日はどこで飲む？",
  description: "今日はどこで飲む？秋葉原の飲み屋を紹介します。",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
export default RootLayout
