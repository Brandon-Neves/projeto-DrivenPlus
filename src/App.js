import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, SignUp, Subscriptions, PlanId, UserArea } from './pages/index'
import GlobalStyle from './styles/globalStyles'
import { useState } from 'react'
import AuthContext from './contexts/AuthContext'
import UserContext from './contexts/UserContext'

function App() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/subscriptions"
              element={<Subscriptions token={token} />}
            />
            <Route
              path="/subscriptions/:ID_DO_PLANO"
              element={<PlanId token={token} />}
            />
            <Route path="/home" element={<UserArea />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
