import { Link, NavLink, useNavigate } from "react-router-dom";
import LOGO from '../assets/logo.png'

const DashboardLayout = ({children} : {children : React.ReactNode}) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')

    }
    // styles
    const activeLink = 'font-bold text-teal-900'
    const nonActive = 'hover:text-teal-900 hover:cursor-pointer'


    return ( 

      <main className="flex h-screen">
         <section className="md:basis-[20%] basis-0 ">
            <div className="md:flex flex-col gap-y-10 h-screen fixed p-5 hidden">
                <figure>
                    <Link to='/'>
                    <img src={LOGO} alt="logo" className="w-24" />
                    </Link>

                </figure>

                <div className="flex flex-col gap-y-5">
                    <NavLink className={({isActive}) => isActive ? activeLink : nonActive} to={'/dashboard'}>Dashboard</NavLink>
                    <NavLink className={({isActive}) => isActive ? activeLink : nonActive} to={'/dashboard/add-book'}>Add Book</NavLink>
                </div>
                

                    <span onClick={handleLogout}  className="flex items-end h-full w-full font-bold hover:text-teal-900 hover:cursor-pointer">Logout</span>
            </div> 
            
            
        </section> 

        <section className="md:basis-[80%] basis-full h-screen">
            {children}
        </section>

    </main>
     );
}
 
export default DashboardLayout;