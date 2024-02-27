import CustomNav from "../components/CustomNav";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex h-screen">
            <section className="md:basis-[10%] basis-0 " />

            <section className="md:basis-[80%] basis-full">
                <CustomNav/>

                <div>{children}</div>
            </section>

            <section className="md:basis-[10%] basis-0 " />

        </main>
    );
}

export default MainLayout;