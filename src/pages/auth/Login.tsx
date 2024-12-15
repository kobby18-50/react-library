import { Button, Label, TextInput } from "flowbite-react";
import AuthLayout from "../../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SpinnerButton from "../../components/SpinnerButton";

import { useAppDispatch } from "../../redux/app/hooks";
import { getUser } from "../../redux/features/user/userSlice";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch()
    
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        const data = {
            email,
            password
        }
        setLoading(true)
        await axios.post(`${BASE_URL}/auth/login`, data)
            .then((response) => {
                dispatch(getUser(response.data))
                setLoading(false)
               toast.success('Login Successful', {
                autoClose: 1500,
                position: "top-center",
               })

               setTimeout(()=>{
                navigate('/dashboard')
               }, 2000)
            })
            .catch((err) => {
                console.log(err.response.data.msg)
                setLoading(false)
                toast.error(err.response.data.msg, {
                    autoClose: 1500,
                    position: "top-center",
                   })
            })
    }

    
    return (
        <AuthLayout>
            <ToastContainer/>
            <main className="lg:mx-20 md:mx-10 mx-5 w-full">
                <div className="text-center text-lg py-5">
                    <p>Welcome back to Book Shelf Buddy!</p>
                    <p className="text-sm">Login to continue</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 gap-y-10">
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="email">Email</Label>
                        <TextInput value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="name@domain.com" className="w-full" required />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="password">Password</Label>
                        <TextInput value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="********" className="w-full" required />
                    </div>

                    {loading ? <div>
                        <SpinnerButton/>
                    </div> : <div>
                        <Button type="submit" className="w-full">Login</Button>
                    </div>}






                    <div>
                        <small>Not registered yet? <Link className="underline" to={'/auth/register'}>Create an account now</Link></small>
                    </div>
                </form>


            </main>
            
        </AuthLayout>

    );
}

export default Login;