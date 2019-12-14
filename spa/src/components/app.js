import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './header'
import Routes from './routes'

const App = () => (
  <BrowserRouter>
    <div className="app-wrapper">
      <Header />
      <main>
        {Routes}
      </main>
    </div>
  </BrowserRouter>
)

export default App
