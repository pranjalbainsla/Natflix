import React, { useEffect } from "react"
import Search from "./components/Search"


const App = () => {
  useEffect(()=>{
    
  }, [])
  return (
    <main>
      <div className="header">Find <span className="purple-gradient">Movies</span> You'll Enjoy Without The Hassle</div>
      <Search /> 
    </main>
  )
}

export default App
