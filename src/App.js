import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Validation from './pages/Validation'
import Dashboard from './pages/Dashboard'
import JobPost from './pages/JobPost'

const App = () => {
  return (
     <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/validate' element={<Validation/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/jobpost' element={<JobPost/>}/>
     </Routes>
  )
}

export default App
