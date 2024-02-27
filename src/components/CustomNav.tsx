import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import LOGO from '../assets/logo.png'

const CustomNav = () => {
    return ( 
        <nav className="flex justify-between p-2 items-center">
        <figure>
            <img src={LOGO} className="md:w-24 w-16" alt="bookshelf-buddy"/>
        </figure>

        <div>
        <Link to="/auth/login"><Button>Get Started</Button></Link>
        </div>
    </nav>
     );
}
 
export default CustomNav;