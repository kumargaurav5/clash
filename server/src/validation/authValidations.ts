import {z} from 'zod'

export const registerSchema = z.object({
    name:z.string({message:"Name is required"}).min(3, {message:"Name must be at least 3 characters"}),
    email:z.string({message:"Email is required"}).email({message:"Invalid email address"}),
    password:z.string({message:"Password is required"}).min(6, {message:"Password must be at least 6 characters"}),
    confirm_password:z.string({message:"Confirm password is required"}).min(6, {message:"Confirm password must be at least 6 characters"}),

}).refine((data) => data.password === data.confirm_password ,{
    message:"Passwords do not match",
    path:["confirm_password"]
})

