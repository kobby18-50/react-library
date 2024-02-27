import { Route, Routes } from 'react-router-dom'
// components
import Homepage from './pages/Homepage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import SingleBook from './pages/SingleBook'
import AddBook from './pages/AddBook'
import Dashboard from './pages/Dashboard'
import DashboardBook from './pages/DashboardBook'
import EditBook from './pages/EditBook'


function App() {
  

  return (
    <section>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        {/* auth routes */}
        <Route path='/add-book' element={<AddBook/>}/>
        <Route path='/auth/login' element={<Login/>} />
        <Route path='/auth/register' element={<Register/>} />
        {/* dashboard routes */}
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/dashboard/add-book' element={<AddBook/>} />
        <Route path='/dashboard/book/:slug' element={<DashboardBook/>} />
        <Route path='/dashboard/edit/:slug' element={<EditBook/>} />

        <Route path='/book/:slug' element={<SingleBook/>} />
      </Routes>
      
      
    </section>
  )
}

export default App
