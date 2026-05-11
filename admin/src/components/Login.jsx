import React, { useState } from 'react'
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login({ setToken }) {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    async function handleSubmit(e) {

        e.preventDefault();

        try {
            const response = await fetch(`${backendUrl}/api/user/admin`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })
            const data = await response.json();
            if (data.success) {
                setToken(data.token);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);

        }

    }

    return (
        <div>
            <div className="w-full min-h-screen flex items-center justify-center">



                <div className="w-80 min-h-2xl border  border-black">
                    <form className="flex flex-col items-center gap-5 p-5" onSubmit={handleSubmit}>
                        <h1 className="font-bold text-2xl">Login</h1>
                        <p>Enter Email</p>
                        <input onChange={(e) => { setemail(e.target.value) }} type="email" name="email" />
                        <p>Enter password</p>
                        <div className="flex border">
                            <input onChange={(e) => { setPassword(e.target.value) }} className="bg-white" type={showPassword ? "text" : "password"} name="email" />
                            <label onClick={() => setShowPassword(prev => !prev)} name="password" className="cursor-pointer text-center ml-auto mr-10">
                                {
                                    showPassword ? "Hide" : "Show"
                                }
                            </label>
                        </div>
                        <button className="text-white transition-transform  hover:scale-105 bg-red-500  cursor-pointer p-2 rounded-sm  border text-center w-32 h-10" type="submit">Sumbit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login