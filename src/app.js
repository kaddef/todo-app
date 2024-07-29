import express from 'express';
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import session from 'express-session';
import path from 'path';
import "dotenv/config"
import rootDir from './helpers/path.js'
//ROUTES
import todoRouters from "./routes/todoRoutes.js"
import authRouters from "./routes/authRoutes.js"
//CONTROLLERS
import { get404, get500 } from "./controllers/error.js"


const PORT = process.env.PORT;
const DBUSERNAME = process.env.DBUSERNAME;
const DBPASSWORD = process.env.DBPASSWORD;
const DB_URI = process.env.DB_URI;

const app = express();
app.set("view engine", "ejs")
app.set("views", "./src/views")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(rootDir, 'public')))
app.use(session({
    secret: 'kaddefTheCat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        //maxAge: 1000 * 60
    },
    store: MongoStore.create({
        mongoUrl: DB_URI,
        collectionName: "sessions"
    })
}))

app.get("/", (req, res) => {
    console.log("In Home Endpoint")
    res.render('home.ejs', { pageTitle: "Todo" })
})

app.use(authRouters)
app.use(todoRouters)


app.use("/500", get500)
app.use(get404)

mongoose
    .connect(
        DB_URI
    )
    .then(result => {
        console.log("Database Connected")
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log("DATABASE ERROR")
        console.log(err)
    })