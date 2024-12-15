import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import { BASE_URL, genres } from "../utils";
import axios from "axios";
import SpinnerButton from "../components/SpinnerButton";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// redux
import { useAppSelector } from "../redux/app/hooks";

const AddBook = () => {

    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    // token from store
    const token = useAppSelector((state) => state.user.user.token)


    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            title,
            genre,
            content
        }

        setLoading(true)

        await axios.post(`${BASE_URL}/books`, data, {headers : {
            Authorization : `Bearer ${token}`
        }})
        .then((res) => {
            console.log(res)

            setLoading(false)

            toast.success('Book Added Successfully', {
                autoClose: 1500,
                position: "top-center",
               })

            setTimeout(() => {
                navigate('/dashboard')
            },2000)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
            toast.error(err.response.data.msg, {
                autoClose: 1500,
                position: "top-center",
               })
        })
    }

    return (
        <DashboardLayout>
            <ToastContainer/>
            <section className="border h-full">
               <h1 className="p-10 font-semibold">Add Book</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 gap-y-10 p-10">
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="title">Title</Label>
                        <TextInput value={title} onChange={e => setTitle(e.target.value)} id="title" type="text" placeholder="Grief Child" className="w-full" required />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="genre">Genre</Label>
                        
                            <Select id="genre" value={genre} onChange={e => setGenre(e.target.value)} required>
                            {
                                genres.map((genre) => (
                                    <option value={genre.genre}>{genre.genre}</option>
                                ))
                            }
                        </Select>
                        
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="content">Content</Label>
                        <Textarea  value={content} onChange={e => setContent(e.target.value)} id="content"  placeholder="Write content here.." className="w-full" rows={5} required />
                    </div>

                   {loading ? <SpinnerButton/> :  <Button type="submit">Add Book</Button>}

                </form>
            </section>
        </DashboardLayout>
    );
}

export default AddBook;