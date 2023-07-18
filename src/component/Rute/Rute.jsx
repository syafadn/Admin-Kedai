import Layout from '../Layout/Layout'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard/Dashboard'
import Menu from '../../pages/Menu/Menu'
import TambahMenu from '../../pages/TambahMenu/TambahMenu'
import EditMenu from '../../pages/EditMenu/EditMenu'
import Profile from '../../pages/Profile/Profile'
import Login from '../../pages/Login/Login'

function Rute() {
  return (
    <>
          <Routes>
            <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/tambah" element={<TambahMenu />} />
              <Route path="/menu/edit" element={<EditMenu />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
    </>
  )
}

export default Rute
