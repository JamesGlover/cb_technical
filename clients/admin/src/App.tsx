import { useState } from 'react'

import { router, RouterProvider } from "./router"

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import { QueryClient, QueryClientProvider } from "./queries"

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Header></Header>
      <div className="grid grid-cols-6">
        <Sidebar></Sidebar>
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  )
}

export default App
