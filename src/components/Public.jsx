import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section >
            <header>
                <h2> welcome</h2>
            </header>
            <main>hello, world!</main>
            <footer><Link to="/login">Employee Login</Link></footer>
        </section>
    )
  return (
    <div>
      {content}
    </div>
  )
}

export default Public
