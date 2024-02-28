import { Avatar, Button, Spinner } from "flowbite-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOOK } from "../models";
import axios from "axios";
import { BASE_URL } from "../utils";

const DashboardBook = () => {

    const {slug} = useParams()

    const navigate = useNavigate()

    const [book, setBook] = useState<BOOK>({} as BOOK)
    const [loading, setLoading] = useState(false)

    const fetchBook = async() => {
        await axios.get(`${BASE_URL}/books/all/${slug}`)
        .then(res => {
            setBook(res.data.book)
        })
        .catch(err => {
            console.log(err)
        })
    }


    const handleDelete = async() => {

        setLoading(true)

        const token = localStorage.getItem('token')
        await axios.delete(`${BASE_URL}/books/${slug}`, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            console.log(res)
            setLoading(false)
            navigate('/dashboard')
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }


    useEffect(()=>{
        fetchBook()
    },[])
    
    return ( 
        <DashboardLayout>
             <section className="flex w-full justify-end border p-3 ">
                    <Avatar rounded>
                        <div className="space-y-1 font-medium dark:text-white">
                            <div>Jese Leos</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Author</div>
                        </div>
                    </Avatar>
                </section>


            <section className="p-3 flex flex-col gap-y-5">

                <h1 className="text-lg font-bold">{book.title}</h1>
                <h1>{book.content}</h1>
                <p className="text-sm">{book.genre}</p>


                <div className="flex gap-x-5">
                    <Link to={`/dashboard/edit/${book._id}`}>
                    <Button color="success">Edit</Button>
                    </Link>

                    
                    {loading ? <Button disabled color="warning"><Spinner color="warning"/></Button> : <Button onClick={handleDelete} color="warning">Delete</Button>}
                    
                    
                </div>

            </section>
        </DashboardLayout>
     );
}
 
export default DashboardBook;