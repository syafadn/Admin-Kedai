import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './config/Apolloclient/Apolloclient'
import Login from './pages/Login/Login'
import Rute from './component/Rute/Rute'
import { useSelector } from 'react-redux'
import { selectUser } from './config/store/userSlice'

function App() {
  const user = useSelector(selectUser);
  return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          {user ? <Rute /> : <Login />}
        </ApolloProvider>
      </BrowserRouter>
  )
}

export default App
