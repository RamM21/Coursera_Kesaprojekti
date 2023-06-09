import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Main from './pages/main'
import Recipes from './pages/recipes'
import Recipepage from './pages/recipe'
import Ttrpg from './pages/ttrpg'
import Ttrpgpage from './pages/ttrpgpage'
import Mypage from './pages/mypage'
import Custom from './pages/custom'
import Custompage from './pages/custompage'
import Signup from './pages/signUp'
import Login from './pages/login'
import { useState } from 'react'

function App() {
  const[logged,setLogged]=useState(false)
  if(logged){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/recipe' element={<Recipes/>}/>
        <Route path='/recipepage'element={<Recipepage/>}/>
        <Route path='/ttrpg' element={<Ttrpg/>}/>
        <Route path='/ttrpgpage' element={<Ttrpgpage/>}/>
        <Route path='/mypage' element={<Mypage/>}/>
        <Route path='/custom' element={<Custom/>}/>
        <Route path='/custompage' element={<Custompage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );}
  else{
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/recipe' element={<Recipes/>}/>
          <Route path='/recipepage'element={<Recipepage/>}/>
          <Route path='/ttrpg' element={<Ttrpg/>}/>
          <Route path='/ttrpgpage' element={<Ttrpgpage/>}/>
          <Route path='/custom' element={<Custom/>}/>
          <Route path='/custompage' element={<Custompage/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login log={setLogged}/>}/>
        </Routes>
      </BrowserRouter>
  );}
}

export default App;
