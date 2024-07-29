import mongoose, { mongo } from "mongoose";
// const todos = []

// class Todo {
//     constructor(todo) {
//         this.description = todo
//         this.isDone = false;
//         this.id = Math.round(Math.random()*4000+1000)
//     }

//     save() {
//         todos.push(this);
//     }

//     markAsCompleted() {
//         this.isDone = true;
//     } 

//     markAsNotCompleted() {
//         this.isDone = false;
//     }

//     updateTodo() {
//         if(this.isDone == true) {
//             this.isDone = false
//         } else {
//             this.isDone = true
//         }
//     }

//     static fetchAll() {
//         return todos;
//     }

//     static fetchFromId(id) {
//         return todos.find(todo => todo.id == id);
//     }

//     static deleteFromId(id) {
//         const index = todos.findIndex(todo => todo.id == id);
//         if (index !== -1) {
//             todos.splice(index, 1);
//             return true;
//         }
//         return false;
//     }
// }

const todoSchema = new mongoose.Schema({
    owner: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    }
});

export const TodoDB = mongoose.model("Todo", todoSchema)