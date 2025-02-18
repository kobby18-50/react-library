// layout
import MainLayout from "../layouts/MainLayout";
// flowbite
import { Spinner, TextInput } from "flowbite-react";
// components
import CardComponent from "../components/CardComponent";
// utils
import { BASE_URL, categories } from "../utils";
import axios from "axios";
// react
import { useEffect, useState } from "react";
// models
import { BOOKS } from "../models";
import EmptyCart from "../components/EmptyCart";
// redux
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { start,fetchSuccess,fetchFailed } from "../redux/features/books/bookSlice";



const Homepage = () => {
    const [title, setTitle] = useState('all books')
    const [query, setQuery] = useState('')


    const [books, setBooks] = useState<BOOKS>([] as BOOKS)


    const loading = useAppSelector((state) => state.book.loading)
    const error = useAppSelector(state => state.book.error)

    const dispatch = useAppDispatch()

   

    const fetchAllBooks = async () => {
        dispatch(start())
        await axios.get(`${BASE_URL}/books/all`)
            .then(res => {
                setBooks(res.data.books)
                dispatch(fetchSuccess())
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchFailed('Failed to fetch required resource'))
            })
    }

    const handleTitle = (genre: string) => {
        setTitle(genre) 
    }


    useEffect(() => {
        fetchAllBooks()
    }, [])


    return (
        <MainLayout>



           <section className="p-5">
           <form className="flex w-full py-10">
                <div className="w-full">
                    <TextInput type="search" className="" placeholder="Search by book title" value={query} onChange={e => setQuery(e.target.value)} />
                </div>
            </form>

            {/* genre */}
            <section className="flex justify-between py-8 gap-5 flex-wrap">
                {
                    categories.map((category) => (
                        <span className="hover:cursor-pointer capitalize" onClick={() => { handleTitle(category.genre) }}  key={category.id}>{category.genre}</span>
                    ))
                }
            </section>

            <h1 className="text-xl font-semibold py-2 capitalize">{title}</h1>


            {/* card */}

            {error ? <div className="flex items-center flex-col justify-center"><p>{error}</p>
                <p className="cursor-pointer" onClick={() => fetchAllBooks()}>Try again</p></div> : <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 justify-center">
                {
                    loading ?
                        <div className="flex items-center w-full justify-center col-span-4"><Spinner size={'xl'} /></div> : 
                        books.filter((val) => {
                            if(query === ''){
                                return val
                            }else if (
                                val.title.toLowerCase().includes(query.toLowerCase())
                            ){
                                return val
                            }
                        })
                        .filter((val2) => {
                            if(title === 'all books'){
                                return val2
                            }else if(
                                val2.genre.toLowerCase().includes(title.toLowerCase())
                            ){
                                return val2
                            }
                        })
                        .map((book) => (

                            <CardComponent key={book._id} book={book} />
                        ))
                }




            </section>}

            {(books.length === 0 && !loading && !error) &&  <div className="flex w-full items-center justify-center">
            <EmptyCart/>

            </div> }


           

            

           </section>
        </MainLayout>
    );
}

export default Homepage;