import { Button, Modal, Spinner } from "flowbite-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOOK } from "../models";
import axios from "axios";
import { BASE_URL } from "../utils";
import CustomAvatar from "../components/CustomAvatar";
import { MdErrorOutline } from "react-icons/md";
// redux
import { useAppSelector } from "../redux/app/hooks";


const DashboardBook = () => {

    const { slug } = useParams()

    const navigate = useNavigate()

    const [book, setBook] = useState<BOOK>({} as BOOK)
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)

     // token from store
     const token = useAppSelector((state) => state.user.user.token)
     console.log(token)


    const fetchBook = async () => {
        await axios.get(`${BASE_URL}/books/all/${slug}`)
            .then(res => {
                setBook(res.data.book)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const handleDelete = async () => {
        setLoading(true)
        await axios.delete(`${BASE_URL}/books/${slug}`, { headers: { Authorization: `Bearer ${token}` } })
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


    useEffect(() => {
        fetchBook()
    }, [])

    return (
        <DashboardLayout>
            <section className="flex w-full justify-end border p-3 ">
                <CustomAvatar />
            </section>


            <section className="p-3 flex flex-col gap-y-5">

                <h1 className="text-lg font-bold">{book.title}</h1>
                <h1>{book.content}</h1>
                <p className="text-sm italic">{book.genre}</p>


                <div className="flex gap-x-5">
                    <Link to={`/dashboard/edit/${book._id}`}>
                        <Button color="success">Edit</Button>
                    </Link>


                    {loading ? <Button disabled color="warning"><Spinner color="warning" /></Button> : <Button onClick={() => setOpenModal(true)} color="warning">Delete</Button>}
                </div>

                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <MdErrorOutline className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this book?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => { setOpenModal(false); handleDelete() }}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>


            </section>
        </DashboardLayout>
    );
}

export default DashboardBook;