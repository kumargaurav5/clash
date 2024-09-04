"use client"
import { registerAction } from "@/actions/authActions";
import { SubmitButton } from '@/components/common/submitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Register() {
    const initState = {
        status: 0,
        message: "",
        errors: {}
    }

    const [state, formAction] = useFormState(registerAction, initState)
    useEffect(()=>{
        if(state.status===200){
            toast.success(state.message)
        }else if(state.status===422){
            toast.error(state.message)
        }
    }, [state])

return (
    <div>
        <form action={formAction}>
            <div className='mt-4'>
                <Label htmlFor="name">Name</Label>
                <Input id='name' type='text' name='name' placeholder='Enter your name..'></Input>
                <span className="text-red-500 text-sm">{state.errors?.name}</span>
            </div>
            <div className='mt-4'>
                <Label htmlFor="email">Email</Label>
                <Input id='email' type='email' name='email' placeholder='Enter your email..'></Input>
                <span className="text-red-500 text-sm">{state.errors?.email}</span>
            </div>
            <div className='mt-4'>
                <Label htmlFor="password">Password</Label>
                <Input id='password' type='password' name='password' placeholder='Enter your password..'></Input>
                <span className="text-red-500 text-sm">{state.errors?.password}</span>
            </div>
            <div className='mt-4'>
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input id='confirm_password' type='password' name='confirm_password' placeholder='Confirm your password..'></Input>
                <span className="text-red-500 text-sm">{state.errors?.confirm_password}</span>
            </div>
            <div className='mt-4'>
                <SubmitButton />
            </div>
        </form>
    </div>
)
}