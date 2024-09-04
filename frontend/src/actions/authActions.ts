"use server"

import { REGISTER_URL } from "@/lib/apiEndPoint"
import axios ,{AxiosError} from "axios"
import { error } from "console"

export async function registerAction(preState: any, formdata: FormData) {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LWNpYXNoLTE3MjM1MjUxOTkxOTEuY2x1c3Rlci0zZzRzY3h0Mm5qZGQ2dW92a3F5ZmNhYmdvNi5jbG91ZHdvcmtzdGF0aW9ucy5kZXYiLCJpYXQiOjE3MjU0MjQ0NDMsImV4cCI6MTcyNTQyODA0M30.NKq9VOPUBdX4vF1VzzvS7Iqa3pG9fgyF4jkuVivEIU5HBV7JbzvBr6admGAgphePHkBFxNQLQvKF6WgvixOAuwWHKJ9ZFSafcWXY59Bfg5xFlYMqU2i7KbQgRZSx5EfEBBdLfltEXm5YtrtbcG9bBZD6gF4C4uAPPRsKaoHF5pjHh4XCfLuMxZ07w2gR6wGLv0PQZ5z8rIqbaYxDoTpOadB9FoXItxX22kqUCl7dsWinRSgHJHfRlFDIo0ey6HRDw4OqdYvEJZ7sIbmqWob0kOtORpcCnMTr68DXjcjPvVFRorxT5yXfvAyuyvi7KRvJo8DKv44GUaxI0lQWNrQJnw';
    console.log(formdata)
    try {
        const{data}= await axios.post(REGISTER_URL, {
            name: formdata.get("name"),
            email: formdata.get("email"),
            password: formdata.get("password"),
            confirm_password: formdata.get("confirm_password")
        },

        {
            headers: {
                Authorization: `Bearer ${token}`, // JWT token in the Authorization header
            },
        }
        
    
    )
        return {
            status:200,
            message:data?.message ?? "Account created successfully! Please check your email to verify your account.",
            errors:{}
            
        }
    } catch (error) {
        if(error instanceof AxiosError){
                if(error.response?.status===422){
                    console.log("error")
                    return{
                        
                        status:422,
                        message:error.response?.data?.message,
                        errors:error.response?.data?.errors
                    }
                }
        }
        console.log(error)
        return {
            status: 500,
            message: "Something went wrong",
            errors: {}
        }
    }
    console.log(formdata)
}