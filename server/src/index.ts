import  express,  { Application , Request , Response} from 'express'
import "dotenv/config"
import path from 'path'
import {fileURLToPath} from 'url'
import ejs from 'ejs'
import { sendEmail } from './config/mail.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app:Application = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine" , "ejs")
app.set("views" , path.resolve(__dirname,"./views"))

app.get("/send-mail" ,async(req: Request , res:Response)=>{
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs` ,{name:"Kumar Gaurav"})
    // await sendEmail("dikine9140@kwalah.com" , "Testing for email" , html)
    await emailQueue.add(emailQueueName ,{to:"dikine9140@kwalah.com" , subject:"Testing for email" , body: html})
    return res.json({msg:"Welcome email sent successfully"})
})

import "./jobs/index.js"
import { emailQueue, emailQueueName } from './jobs/EmailJob.js'


app.listen(PORT ,()=>{
    `server is running on PORT ${PORT}`
})
