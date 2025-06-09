import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Layout from './page/admin/Layout';
import Admin from './page/admin/Admin';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { useLocalStorage } from 'react-use';


function App() {

  const [user] = useLocalStorage('user')
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route element={ <ProtectedRoute canActivate={user}/>} >
          <Route element={<Layout />}>
            <Route path="/admin" element={<Admin />} />
            {/* <Route path="/formulario-alumno" element={<StudentForm />} />
            <Route path="/alumno/:id" element={<StudentDetail />} /> */}
          </Route>
        </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
