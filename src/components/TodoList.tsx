// import { DUMMY_Todos } from "../data/dummy";
import type { Todo } from "../features/todos/todoTypes";
import TodoItem from "./TodoItem";

interface TodoListPropTypes {
    todo: Todo[];
}

const TodoList = ({todo}: TodoListPropTypes) => {
    if (!Array.isArray(todo)) {
        return <div>No todos available</div>;
    }

    return (
        <div className="">
            {todo.map((todo, index) => (
                <TodoItem
                    key={todo._id || index}
                    todo={todo}
                />
            ))}
        </div>
    )
}

export default TodoList;