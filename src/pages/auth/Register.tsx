import { Button, Label, TextInput } from "flowbite-react";
import AuthLayout from "../../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";
import SpinnerButton from "../../components/SpinnerButton";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Register = () => {

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        const data = {
            firstName: fname,
            lastName: lname,
            email,
            password
        }

        setLoading(true)

        await axios.post(`${BASE_URL}/auth/register`, data)
            .then((res) => {
                setLoading(false)

                toast.success('Registeration Successful Log in now', {
                    autoClose: 2000,
                    position: "top-center",
                   })

                setTimeout(() => {
                    navigate('/auth/login')
                },2500)
            })
            .catch((err) => {
    
                toast.error(err.response.data.msg, {
                    autoClose: 1500,
                    position: "top-center",
                   })
                setLoading(false)
            })
    }
    return (
        <AuthLayout>
            <ToastContainer/>
            <main className="lg:mx-20 md:mx-10 mx-5 w-full">
                <div className="text-center text-lg py-5">
                    <p>New to to Book Shelf Buddy!</p>
                    <p className="text-sm">Register to continue</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-10">
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="flex flex-col w-full gap-3">
                            <Label htmlFor="fname">First Name</Label>
                            <TextInput value={fname} onChange={e => setFname(e.target.value)} id="fname" type="text" placeholder="Edward" className="w-full" required />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label htmlFor="lname">Last Name</Label>
                            <TextInput value={lname} onChange={e => setLname(e.target.value)} id="lname" type="text" placeholder="Kwabena" className="w-full" required />
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="email">Email</Label>
                        <TextInput value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="name@domain.com" className="w-full" required />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="password">Password</Label>
                        <TextInput value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="********" className="w-full" required />
                    </div>

                    {loading ? <div><SpinnerButton /></div> : <div>
                        <Button type="submit" className="w-full">Register</Button>
                    </div>}

                    <div>
                        <small>Already have an account <Link className="underline" to={'/auth/login'}>Log in instead</Link></small>
                    </div>
                </form>
            </main>
        </AuthLayout>
    );
}

export default Register;