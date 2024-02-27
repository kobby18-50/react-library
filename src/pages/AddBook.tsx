import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import { genres } from "../utils";

const AddBook = () => {

    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(title, genre, content)
    }

    return (
        <DashboardLayout>
            <section>
               <h1 className="p-10 font-semibold"> Add Book</h1>

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
                        <Textarea  value={content} onChange={e => setContent(e.target.value)} id="content"  placeholder="Write content here.." className="w-full" required />
                    </div>

                    <Button type="submit">Add Book</Button>

                </form>
            </section>
        </DashboardLayout>
    );
}

export default AddBook;