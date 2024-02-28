import { Link } from "react-router-dom";

const DashboardLayout = ({children} : {children : React.ReactNode}) => {
    return ( 

      <main className="flex h-screen">
         <section className="md:basis-[20%] basis-0  ">
            <div className="md:flex flex-col gap-y-10 h-screen fixed p-5 hidden">
                <div>LOGO</div>

                <div className="flex flex-col gap-y-5">
                    <Link to={'/dashboard'}>Dashboard</Link>
                    <Link to={'/dashboard/add-book'}>Add Book</Link>
                </div>

                    <span className="flex items-end h-full">Logout</span>
            </div> 
            
            
        </section> 

        <section className="md:basis-[80%] basis-full h-screen">
            {children}
        </section>

    </main>
     );
}
 
export default DashboardLayout;