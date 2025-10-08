import React from 'react'
import Link from 'next/link'

export default function WineriesPage() {
  return (
    <div>
      
      
      <nav>
        <h1>Bodegas</h1>
        <ul>
          <li>
              <Link href="/containers/categories/bodegas">Bodegas</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
