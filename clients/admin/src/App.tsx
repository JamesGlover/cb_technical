import { useState } from 'react'

import { router, RouterProvider } from "./router"

import Header from './components/Header'
import Sidebar from './components/Sidebar'


function App() {


  return (
    <>
      <Header></Header>
      <div className="grid grid-cols-6">
        <Sidebar></Sidebar>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
