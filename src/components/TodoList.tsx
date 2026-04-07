import React from "react";
import { Box } from "@mui/material";
import TodoItem from "./TodoItem";
import EmptyState from "./todo/EmptyState";
import type { FilterOption } from "./common/FilterTabs";
import type { Todo } from "../features/todos/todoTypes";

interface Props {
    todos: Todo[];
    filter: FilterOption;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, text: string) => void;
}

const TodoList: React.FC<Props> = ({
    todos,
    filter,
    onToggle,
    onDelete,
    onEdit
}) => {
    if (todos.length === 0) {
        return <EmptyState filter={filter} />;
    }

    return (
        <Box>
            {todos.map((todo, i) => (
                <Box
                    key={todo._id}
                    sx={{
                        animation: `fadeUp 0.3s ease ${i * 0.04}s both`
                    }}
                >
                    <TodoItem
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default TodoList;