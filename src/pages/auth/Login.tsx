import { Button, Label, TextInput } from "flowbite-react";
import AuthLayout from "../../layouts/AuthLayout";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e : React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        console.log(email, password)
    }
    return ( 
        <AuthLayout>
            <main className="lg:mx-20 md:mx-10 mx-5 w-full">
                <div className="text-center text-lg py-5">
                    <p>Welcome back to Book Shelf Buddy!</p> 
                    <p className="text-sm">Login to continue</p>
                    </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 gap-y-10">
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="email">Email</Label>
                        <TextInput value={email} onChange={e => setEmail(e.target.value)} id="email"  type="email" placeholder="name@domain.com" className="w-full" required/>
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <Label htmlFor="password">Password</Label>
                        <TextInput value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="********" className="w-full" required/>
                    </div>

                    <div>
                        <Button type="submit" className="w-full">Login</Button>
                    </div>

                    <div>
                        <small>Not registered yet? <Link className="underline" to={'/auth/register'}>Create an account now</Link></small>
                    </div>
                </form>
            </main>
        </AuthLayout>
     );
}
 
export default Login;