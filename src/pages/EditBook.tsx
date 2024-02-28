import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { BASE_URL, genres } from "../utils";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerButton from "../components/SpinnerButton";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type Book = {
    title : string,
    content : string,
    genre : string,
    [key: string]: string
}
const EditBook = () => {

    const initialBook : Book = {
        title : '',
        content : '',
        genre : ''
    }

    const [book, setBook] = useState<Book>(initialBook)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    

    const {slug} = useParams()

    const fetchBook = async() => {
        await axios.get(`${BASE_URL}/books/all/${slug}`)
        .then(res => {
            setBook(res.data.book)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchBook()
    },[])


    // form handleChange
    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const booksClone = { ...book };
        booksClone[e.target.name] = e.target.value;
        setBook(booksClone);
      };


    //   form submit

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            title : book.title,
            genre : book.genre,
            content : book.content
        }

        const token = localStorage.getItem('token')

        await axios.patch(`${BASE_URL}/books/${slug}`, data, { headers : {Authorization : `Bearer ${token} `}})
        .then(res => {
            toast.success('Book Updated Successfully', {
                autoClose: 1500,
                position: "top-center",
               })
            setLoading(false)

            setTimeout(() => {
                navigate('/dashboard')
            },2000)

        })
        .catch(err => {
            console.log(err)
            toast.error(err.response.data.msg, {
                autoClose: 1500,
                position: "top-center",
            })
            setLoading(false)
            
        })
    }

    return (
        <DashboardLayout>
            <ToastContainer/>
            <section>
               <h1 className="p-10 font-semibold"> Edit Book</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 gap-y-10 p-10">
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="title">Title</Label>
                        <TextInput value={book.title} onChange={handleChange}  name="title" id="title" type="text" placeholder="Grief Child" className="w-full" required />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="genre">Genre</Label>
                        
                            <Select id="genre" name="genre" onChange={handleChange} value={book.genre}  required>
                            {
                                genres.map((genre,index) => (
                                    <option key={index} value={genre.genre}>{genre.genre}</option>
                                ))
                            }
                        </Select>
                        
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="content">Content</Label>
                        <Textarea  value={book.content}  name="content" onChange={handleChange} id="content"  placeholder="Write content here.." className="w-full" required />
                    </div>

                    {loading ? <SpinnerButton/> : <Button type="submit">Update Book</Button>}

                </form>
            </section>
        </DashboardLayout>
    );
}

export default EditBook;