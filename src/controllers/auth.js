import {TodoDB} from "../models/todo.js"

export function checkSession (req,res,next) {
    console.log("Checking session")
    if(req.session.uid) {
        console.log("This User is Already Have Session")
    } else {
        console.log("This User is not have session")
    }
    next()
}

export async function firstTimeUser (req,res,next) {
    if(req.body.userId) {
        console.log("Checking Entered UID")
        const isThereUser = await TodoDB.findOne({owner: req.body.userId})
        console.log(isThereUser)
        if(isThereUser) {
            req.session.uid = req.body.userId
        }
        res.redirect('/profile')
    } else {
        req.session.uid = Math.floor(Math.random() * 9000) + 1000;
        console.log(req.session.uid)
        console.log("Empty UID field new Session Created")
        res.redirect('/profile')
    }
}

export function nukeSession (req,res) {
    console.log("Nuking History")
    req.session.destroy((err)=>{
        if(err) {
            console.log(err)
        } else {
            res.clearCookie("connect.sid")
            res.redirect('/profile')
        }
    })
}