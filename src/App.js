import { Main } from './routes'
import { ConfigContextProvider } from './contexts/ConfigContext'

import './App.scss'
// import './style.scss'
import "swiper/css"
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { RoomContextProvider } from './contexts/RoomContext'

function App() {
  return (
    <ConfigContextProvider>
      <RoomContextProvider>
        <Main />
      </RoomContextProvider>
    </ConfigContextProvider>
  )
}

export default App
