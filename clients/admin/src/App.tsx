import { useState } from 'react'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

function Page() {
  return <div></div>
}

function App() {


  return (
    <>
      <Header></Header>
      <div className="">
        <Sidebar></Sidebar>
        <Page></Page>
      </div>
    </>
  )
}

export default App
