// layout
import MainLayout from "../layouts/MainLayout";
// flowbite
import { Button, Spinner, TextInput } from "flowbite-react";
// components
import CardComponent from "../components/CardComponent";
// utils
import { BASE_URL, categories } from "../utils";
import axios from "axios";
// react
import { useEffect, useState } from "react";
// models
import { BOOKS } from "../models";



const Homepage = () => {
    const [title, setTitle] = useState('All Books')
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    const [filteredBooks, setFilteredBooks] = useState<BOOKS>([] as BOOKS)

    const fetchAllBooks = async () => {
        setLoading(true)
        await axios.get(`${BASE_URL}/books/all`)
            .then(res => {
                setFilteredBooks(res.data.books)
                setLoading(false)
                setError(false)
            })
            .catch(err => {
                console.log(err)
                setError(true)
                setLoading(true)
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



            <form className="flex w-full p-2 gap-x-2 py-10">
                <div className="w-full">
                    <TextInput type="search" className="" placeholder="Search by book title" value={query} onChange={e => setQuery(e.target.value)} />
                </div>

                <div>

                    <Button>Search</Button>
                </div>
            </form>

            {/* genre */}
            <section className="flex justify-between py-8">
                {
                    categories.map((category) => (
                        <span className="hover:cursor-pointer capitalize" onClick={() => { handleTitle(category.genre) }} key={category.id}>{category.genre}</span>
                    ))
                }
            </section>

            <h1 className="text-xl font-semibold py-2 capitalize">{title}</h1>


            {/* card */}

            {error ? <div className="flex items-center flex-col justify-center"><p>Error fetching resource</p>
                <p className="cursor-pointer" onClick={() => {fetchAllBooks}}>Try again</p></div> : <section className="grid grid-cols-4 gap-5">
                {
                    loading ?
                        <div className="flex items-center w-full justify-center col-span-4"><Spinner size={'xl'} /></div> : filteredBooks.map((book) => (

                            <CardComponent key={book._id} book={book} />
                        ))
                }


            </section>}
        </MainLayout>
    );
}

export default Homepage;