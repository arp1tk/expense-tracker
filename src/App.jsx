import React from 'react'
import { Auth } from './components/auth'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Expense} from './components/expense'


const App = () => {
  
  return (
    <div className='app'>
     <Router>
      <Routes>
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/expense' element={<Expense/>}></Route>
      </Routes>
    </Router> 
    </div>
    
  )
}

export default App
