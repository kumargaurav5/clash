import { Router } from "express";
import { registerSchema } from "../validation/authValidations.js";
import { ZodError } from "zod";
import { formatError, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
const router = Router();
router.post("/register", async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        });
        if (user) {
            return res.status(422).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);
        const token = await bcrypt.hash(uuidv4(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
        const emailBody = await renderEmailEjs("email-verify", {
            name: payload.name,
            url: url
        });
        await emailQueue.add(emailQueueName, { to: payload.email, subject: "Verify your email", body: emailBody });
        user = await prisma.user.create({ data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword,
                email_verify_token: token
            } });
        return res.json({ message: "Please check our email. we have sent you a verification email!", user });
    }
    catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Validation error", errors });
        }
        return res.status(422).json(error);
    }
    return res.status(500).json({ message: "Something went wrong" });
});
export default router;
