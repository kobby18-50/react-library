import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { BASE_URL, genres } from "../utils";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditBook = () => {

    const initialBook = {
        title : '',
        content : '',
        genre : ''
    }

    const [book, setBook] = useState(initialBook)

    

    const {slug} = useParams()

    const fetchBook = async() => {
        await axios.get(`${BASE_URL}/books/all/${slug}`)
        .then(res => {
            console.log(res.data.book)
            setBook(res.data.book)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchBook()
    },[])

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <DashboardLayout>
            <section>
               <h1 className="p-10 font-semibold"> Edit Book</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 gap-y-10 p-10">
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="title">Title</Label>
                        <TextInput value={book.title}  id="title" type="text" placeholder="Grief Child" className="w-full" required />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="genre">Genre</Label>
                        
                            <Select id="genre" value={book.genre}  required>
                            {
                                genres.map((genre) => (
                                    <option value={genre.genre}>{genre.genre}</option>
                                ))
                            }
                        </Select>
                        
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="content">Content</Label>
                        <Textarea  value={book.content}  id="content"  placeholder="Write content here.." className="w-full" required />
                    </div>

                    <Button type="submit">Update Book</Button>

                </form>
            </section>
        </DashboardLayout>
    );
}

export default EditBook;