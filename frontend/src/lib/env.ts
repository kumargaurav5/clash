class Env{
    static BACKEND_URL:string = process.env.BACKEND_APP_URL as string;
    static APP_URL:string = process.env.FRONTEND_URL as string
}

export default Env
