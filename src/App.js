import React from "react"
import { Header } from "./layout/Header"
import { Main } from "./layout/Main"
import { Footer } from "./layout/Footer"
import { BrowserRouter } from "react-router-dom"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
