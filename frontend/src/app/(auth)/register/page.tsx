import Link from 'next/link'
import React from 'react'
import Register from "@/components/auth/Register"

export default function Login() {
    return (

        <div className='flex justify-center items-center h-screen'>
            <div className='w-[550px] bg-white rounded-xl px-10 shadow-md py-5'>
                <h1 className='text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500  text-transparent bg-clip-text text-center'>Clash</h1>  
                <h1 className='text-3xl font-bold'>Register</h1>
                <p>Welcome to clash</p>
                <Register />
            <p className='my-2 text-center'>Don't have an account ? <strong><Link href='/login'>Login</Link></strong></p>
            </div>
        </div>
    )
}