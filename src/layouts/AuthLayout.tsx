
const AuthLayout = ({children} : {children : React.ReactNode }) => {
    return ( 
        <main className="flex h-screen">
            <section className="lg:basis-1/4 md:basis-[10%] basis-0 " />

            
            <section className=" lg:basis-2/4 md:basis-[80%] basis-full flex w-full items-center justify-center">
            {children}
            </section>
            <section className="lg:basis-1/4 md:basis-[10%] basis-0 "  />

            

        </main>
     );
}
 
export default AuthLayout;