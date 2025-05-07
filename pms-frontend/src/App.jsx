
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListPlayerComponent from './components/ListPlayerComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HelloWorld from './HelloWorld'
import PlayerComponent from './components/PlayerComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path='/' element = {<ListPlayerComponent />}></Route>
          {/* // http://localhost:3000/players */}
          <Route path='/players' element = {<ListPlayerComponent />}></Route>
          {/* // http://localhost:3000/add-players */}
          <Route path='/add-player' element={<PlayerComponent />}></Route>

          {/* // http://localhost:3000/edit-players/1 */}
          <Route path='/edit-player/:id' element = { <PlayerComponent /> }></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
