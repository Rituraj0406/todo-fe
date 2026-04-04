import type { Todo } from "../features/todos/todoTypes";
import { deleteTodo, toggleTodo } from "../features/todos/todoSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

interface TodoItemProps {
    todo: Todo;
}

const TodoItem = ({todo}: TodoItemProps) => {
    const dispatch = useAppDispatch();
    
    return (
        <div className="flex flex-col justify-between items-center max-w-95.5 md:max-w-full mt-4 md:mt-0 mx-auto">
            <div className="flex justify-between items-center w-full">
                <span onClick={() => dispatch(toggleTodo({ id: todo._id, completed: todo.completed }))} className={`${todo.completed ? "line-through" : "none"} cursor-pointer`}>
                    {todo.task || 'N/A'}
                </span>
                <button onClick={() => dispatch(deleteTodo(todo?._id))} className="cursor-pointer hover:scale-105">❌</button>
            </div>
            <hr className="bg-slate-500 w-full mt-2 h-px mb-2"/>
        </div>
    )
}

export default TodoItem;