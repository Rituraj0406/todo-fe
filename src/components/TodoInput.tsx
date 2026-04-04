import React, { useState } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addTodo } from "../features/todos/todoSlice";

const TodoInput = () => {
    const [task, setTask] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!task.trim()) return;
        dispatch(addTodo({ task: task, completed: false }));
        setTask('');
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit} className="flex gap-2 justify-center">
                <input 
                    id="task" 
                    name="task" 
                    type="text" 
                    placeholder="What needs to be done?" 
                    value={task} 
                    onChange={(e) => setTask(e.target.value)}
                    className="px-4 py-2 outline-none border-blue-400 border rounded-lg"
                />
                <button type="submit" className="bg-green-700 hover:bg-green-800 cursor-pointer text-white rounded-lg px-4 py-2 hover:scale-105">Add</button>
            </form>
        </div>
    )
}

export default TodoInput;