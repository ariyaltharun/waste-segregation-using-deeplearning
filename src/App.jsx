import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import Footer from './Components/Footer'


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Evaluation from './Components/Evaluation'
import Features from './Components/Features'
import EvaluationResult from './Components/EvaluationResult'


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
  // {
  //   path: "/UploadImageFolder",
  //   element: 
  //   <>
  //     <Navbar />
  //     <UploadImagesFolder />
  //     <Footer />
  //   </>
  // },
  {
    path: "/Evaluation",
    element: 
    <>
      <Navbar />
      <Evaluation />
      <Footer />
    </>
  },
  {
    path: "/EvaluationResult",
    element:
    <>
      <Navbar />
      <EvaluationResult />
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
