import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Main from './pages/main'
import Recipes from './pages/recipes'
import Ttrpg from './pages/ttrpg'
import Mypage from './pages/mypage'
import Custom from './pages/custom'
import Signup from './pages/signUp'
import Login from './pages/login'

function App() {
  var user = sessionStorage.getItem("user")
  if(user){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/recipe' element={<Recipes/>}/>
        <Route path='/recipe'/>
        <Route path='/ttrpg' element={<Ttrpg/>}/>
        <Route path='/mypage' element={<Mypage/>}/>
        <Route path='/custom' element={<Custom/>}/>
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
          <Route path='/recipe'/>
          <Route path='/ttrpg' element={<Ttrpg/>}/>
          <Route path='/custom' element={<Custom/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
  );}
}

export default App;
