import { useState } from 'react'
import './App.css'
import BecomeTutor from './pages/BecomeTutor/BecomeTutor'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/register-tutor' element={<BecomeTutor/>}/>
      
      
      
    </Routes>
  )
}

export default App
