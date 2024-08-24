import express from 'express';
import "dotenv/config";
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.get("/", (req, res) => {
    return res.render("welcome");
});
app.listen(PORT, () => {
    `server is running on PORT ${PORT}`;
});
