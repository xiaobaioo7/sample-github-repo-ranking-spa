import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header className="main-header">
    <ul>
      <li className="nav-item-home">
        <Link to="/">
          <strong>GitHub Repositories Ranking</strong>
        </Link>
      </li>
      <li><Link to="/">Home</Link></li>
    </ul>
  </header>
)

export default Header
