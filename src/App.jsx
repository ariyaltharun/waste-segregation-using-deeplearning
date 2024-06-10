import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Footer from './components/Footer'


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UploadImages from './pages/UploadImages'
import Features from './components/Features'
import EvaluateModel from './pages/EvaluateModel'


const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
      <Navbar />
      <Home />
      <Features />
      <Footer />
    </>
  },
  {
    path: "/About",
    element:
    <>
      <Navbar />
      <About />
      <Footer />
    </>
  },
  {
    path: "/UploadImages",
    element: 
    <>
      <Navbar />
      <UploadImages />
      <Footer />
    </>
  },
  {
    path: "/EvaluateModel",
    element:
    <>
      <Navbar />
      <EvaluateModel />
      <Footer />
    </>
  }
])

function App() {

  return <RouterProvider router={router} />
  return (
    <>
    <NavBar />
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <Footer />
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
