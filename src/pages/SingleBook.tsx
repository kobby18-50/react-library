import axios from "axios";
import MainLayout from "../layouts/MainLayout";
// react-router
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils";
import { useEffect, useState } from "react";
import { BOOK } from "../models";


const SingleBook = () => {

    const {slug} = useParams()

    const [book, setBook] = useState<BOOK>({} as BOOK)


    const getSingleBook = () => {
        axios.get(`${BASE_URL}/books/all/${slug}`)
        .then((res) => {
            console.log(res.data.book)
            setBook(res.data.book)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getSingleBook()
    },[])
    return ( 
        <MainLayout>
            <main className="p-10 flex flex-col gap-10">
            <h1 className="font-bold text-xl md:text-2xl">{book.title}</h1>
            <section className="flex gap-10">
                <div className="flex space-x-2">
                    <span className="font-bold">By:</span>
                    <span>{book.author}</span>
                </div>
                <div className="flex space-x-2">
                    <span className="font-bold">Year:</span>
                    <span>{book.year}</span>
                </div>
                <div className="flex space-x-2">
                    <span className="font-bold">Genre:</span>
                    <span>{book.genre}</span>
                </div>

            </section>
                <p>{book.content}</p>
            </main>
        </MainLayout>
     );
}
 
export default SingleBook;