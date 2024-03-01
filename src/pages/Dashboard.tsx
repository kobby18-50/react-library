import { Spinner } from "flowbite-react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashBoardCard from "../components/DashBoardCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { BOOKS } from "../models";
import CustomAvatar from "../components/CustomAvatar";

const Dashboard = () => {
    const [books, setBooks] = useState<BOOKS>([] as BOOKS)
    const [loading, setLoading] = useState(false)

    const fetchBooks = async() => {
        const token = localStorage.getItem('token')

        setLoading(true)
        
        await axios.get(`${BASE_URL}/books`, {headers : {
            Authorization : `Bearer ${token}`
        }})
        .then((res) => {

            setBooks(res.data.books)
            setLoading(false)

            
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchBooks()
    }, [])


    return (
        <DashboardLayout>
            <main className="">

                <section className="flex w-full justify-end border p-3 ">
                    <CustomAvatar/>
                </section>

               {
                loading ? <div className="flex items-center w-full justify-center h-screen"><Spinner size={'xl'} /></div> :  <section className="p-3 grid  bg-teal-700 ">

                   
                  
                {
                     books.map((book) => (
                         <DashBoardCard key={book._id} book={book} />
                     ))
                 }
                 
             
             </section>
               }

            </main>
        </DashboardLayout>
    );
}

export default Dashboard;