import {TodoDB} from "../models/todo.js"

export async function addTodo (req,res) {
    console.log("Inn AddTodo Endpoint");
    try {
        await new TodoDB({ owner: req.session.uid, text: req.body.description, isDone: false }).save();
        res.redirect("/profile");
    } catch (err) {
        console.log(err);
        res.redirect("/500");
    }
}

export async function deleteTodo (req,res) {
    console.log("Inn DeleteTodo Endpoint");
    const todoId = req.params.todoId;
    try {
        await TodoDB.findByIdAndDelete(todoId);
        res.redirect("/profile");
    } catch (err) {
        console.log(err);
        res.redirect("/500");
    }
}

export async function updateTodo (req,res) {
    console.log("Inn UpdateTodo Endpoint");
    const todoId = req.params.todoId;
    try {
        const todo = await TodoDB.findById(todoId);
        if (todo) {
            todo.isDone = !todo.isDone;
            await todo.save();
        } else {
            throw new Error("Internal Server Error")
        }
        res.redirect("/profile");
    } catch (error) {
        console.log(error);
        res.redirect("/500");
    }
}

export async function getTodoPage (req,res) {
    if (req.session.uid) {
        try {
            const todos = await TodoDB.find({ owner: req.session.uid });
            res.render('profile', { pageTitle: "Profile", todos: todos, uid: req.session.uid });
        } catch (err) {
            res.redirect("/500");
        }
    } else {
        res.render('profile', { pageTitle: "Profile", todos: {}, uid: "" });
    }
}