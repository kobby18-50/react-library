import axios from "axios";
import MainLayout from "../layouts/MainLayout";
// react-router
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils";
import { useEffect, useState } from "react";
import { BOOK } from "../models";
import { Spinner } from "flowbite-react";


const SingleBook = () => {

    const {slug} = useParams()

    const [book, setBook] = useState<BOOK>({} as BOOK)
    const [loading, setLoading] = useState(false)


    const getSingleBook = () => {
        setLoading(true)
        axios.get(`${BASE_URL}/books/all/${slug}`)
        .then((res) => {
            console.log(res.data.book)
            
            setBook(res.data.book)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        getSingleBook()
    },[])
    return ( 
        <MainLayout>
            {
                loading ? <div className="flex justify-center items-center"><Spinner size={'xl'}/></div> : <main className="p-10 flex flex-col gap-10">
                <h1 className="font-bold text-xl md:text-2xl">{book.title}</h1>
                <section className="flex flex-col lg:flex-row gap-10">
                    <div className="flex space-x-2">
                        <span className="font-bold">By:</span>
                        <span className="capitalize">{book.author}</span>
                    </div>
                    <div className="flex space-x-2">
                        <span className="font-bold">Year:</span>
                        <span className="capitalize">{book.year}</span>
                    </div>
                    <div className="flex space-x-2">
                        <span className="font-bold">Genre:</span>
                        <span className="capitalize">{book.genre}</span>
                    </div>
    
                </section>
                    <p>{book.content}</p>
                </main>
            }
        </MainLayout>
     );
}
 
export default SingleBook;