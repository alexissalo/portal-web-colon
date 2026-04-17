import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout({
  children,
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[var(--header-height)]">
        {children}
      </main>
      <Footer />
    </div>
  )
}

