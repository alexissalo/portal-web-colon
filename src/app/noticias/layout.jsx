import Header from "../components/Header"
import Footer from "../components/Footer"

export default function NoticiasLayout({
    children,
  }) {
    return (
      <div className="min-h-screen">
        <Header/>
        {children}
        <Footer/>
      </div>
    )
  }
  
  