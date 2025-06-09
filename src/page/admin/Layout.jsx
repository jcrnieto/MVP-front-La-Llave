import { Outlet } from 'react-router-dom'
import Navbar from '../../components/protectedRoute/Navbar'
import Footer from '../../components/protectedRoute/Footer'

const Layout = () => {
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar/>
           <main className="flex-1">
                <Outlet />
           </main>
           <Footer/>
        </div>
    )
}

export default Layout